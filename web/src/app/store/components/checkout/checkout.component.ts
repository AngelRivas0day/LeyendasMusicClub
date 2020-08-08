import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CartService } from 'src/app/shared/services/cart.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from '../../../../environments/environment';
import {MatDialog} from '@angular/material/dialog';
import { InfoComponent } from '../info/info.component';
import states from '../../../../assets/states.json';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})

export class CheckoutComponent implements OnInit {

  // @ViewChild ('paypal', {static: true}) paypalElement: ElementRef;
  elements: Elements;
  card: StripeElement;
  stripeTest: FormGroup;
  elementOptions: ElementsOptions = {
    locale: 'es'
  };
  deliveryFee: number = environment.deliveryFee;
  products$: Observable<any>;
  form: FormGroup;
  total: number;
  subtotal: number;
  items: any[];
  payMethods: any[] = [
    {
      id: 1,
      name: 'Pago en tienda'
    },
    {
      id: 2,
      name: 'Pago con tarjeta'
    }
    // {
    //   id: 3,
    //   name: 'Pago en OXXO'
    // }
  ];
  deliverMethods: any[] = [
    {
      id: 1,
      name: 'Recoger en tienda',
      value: 'tienda'
    },
    {
      id: 2,
      name: 'Paqueteria tradicional',
      value: 'envio'
    }
  ];
  states: any[];
  currentState: any[];
  currentCities: any[];
  isLinear = true;

  constructor(
    public activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private cartService: CartService,
    private apiService: ApiService,
    public dialog: MatDialog,
    private stripeService: StripeService
  ) { 
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      paymentMethod: new FormControl('', [Validators.required]),
      pickupMethod: new FormControl('', [Validators.required]),
      products: new FormControl('', [Validators.required]),
      subtotal: new FormControl('', [Validators.required]),
      total: new FormControl('', [Validators.required]),

      uuid: new FormControl('123', [Validators.required]),
      paymentState: new FormControl('pendiente', [Validators.required])
    });
    this.states = Object.keys(states);
    this.cartService.subtotal$.subscribe((value:any)=>{
      this.subtotal = value;
      this.total = this.subtotal + this.deliveryFee;
    });
  }

  ngOnInit(): void {
    this.products$ = this.cartService.cart$;
    this.cartService.subtotal$.subscribe(subtotal=>{
      this.subtotal = parseInt(subtotal);
    }, (err)=>{
      console.log(err);
    });
    this.products$.subscribe((data:any)=>{
      this.form.get('products').setValue(JSON.stringify(data));
      this.items = data;
    },(err)=>{
      console.log(err)
    });
    this.form.get('total').setValue(this.total);
    this.form.get('subtotal').setValue(this.subtotal);

    this.stripeTest = this.formBuilder.group({
      products: new FormControl('', [Validators.required]),
      stripeToken: new FormControl(''),
      total: new FormControl('', [Validators.required])
    });
  }

  onSubmit(stepper){
    this.stripeTest.get('products').setValue(JSON.stringify(this.items));

    if(this.form.value.paymentMethod == "Pago con tarjeta"){
      stepper.next();
      this.mountCard();
    }else{
      stepper.next();
    }
    // set unique id
    let key = this.form.value.name + '_comp_';
    this.form.get('uuid').setValue(this.randstr(key.toLowerCase()));
    this.stripeTest.get('total').setValue(this.total);
  }

  changeHandler(e){
    console.log(e.source.value);
    this.currentCities = states[e.source.value];
  }

  changeDeliveryHandler(event){
    if(event.source.value == "tienda"){
      this.deliveryFee = 0;
      this.total = this.subtotal;
    }else{
      this.deliveryFee = environment.deliveryFee;
      this.total = this.deliveryFee + this.subtotal;
    }
  }

  stripeSubmit(stepper){
    const name = this.form.get('name').value; // getting the name of the customer
    this.stripeService.createToken(this.card, {name}).subscribe((result:any)=>{
      if(result){
        this.stripeTest.get('stripeToken').setValue(result.token.id);
        let formData = new FormData();
        formData = this.apiService.toFormData(this.stripeTest.value);
        this.apiService.post('products/order', this.stripeTest.value).subscribe((resp:any)=>{
          stepper.next();
          this.form.get('paymentState').setValue('pagado');
          this.saveOrder();
        },(err)=>{
          this.stripeErrorHanlder(err);
        });
      }else if(result.error){
        console.log("Hubo un error", result.error.message);
      }
    });
  }

  stripeErrorHanlder(error: string){
    console.error("Hubo un error: ", error);
  }

  mountCard(){
    this.stripeService.elements(this.elementOptions).subscribe((elements)=>{
      this.elements = elements;
      if(!this.card){
        this.card = this.elements.create('card', {
          style: {
            base: {
              iconColor: '#333333',
              color: '#333333',
              lineHeight: '40px',
              fontWeight: 200,
              fontSize: '24px'
            }
          }
        });
        this.card.mount('#card-element');
      }
    });
  }

  saveOrder(){
    this.apiService.post('orders/create', this.form.value).subscribe((data:any)=>{
      console.log(data);
    },err=>{
      console.log(err);
    });
  }

  onNext(stepper){
    stepper.next();
    this.saveOrder();
  }

  randstr(prefix){
    return Math.random().toString(36).replace('0.',prefix || '');
  }

  clearCart(){
    this.cartService.clearCart();
  }
}
