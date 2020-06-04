import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { CartService } from 'src/app/shared/services/cart.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from '../../../../environments/environment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { InfoComponent } from '../info/info.component';
import states from '../../../../assets/states.json';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  deliveryFee: number = environment.deliveryFee;
  products$: Observable<any>;
  form: FormGroup;
  subtotal: number;
  total: number;
  payMethods: any[] = [
    {
      id: 1,
      name: 'Pago en tienda'
    },
    {
      id: 2,
      name: 'Transferencia bancaria'
    },
    {
      id: 3,
      name: 'Pago en OXXO'
    }
  ];
  deliverMethods: any[] = [
    {
      id: 1,
      name: 'Recoger en tienda'
    },
    {
      id: 2,
      name: 'Paqueteria tradicional'
    }
  ];
  states: any[];
  currentState: any[];
  currentCities: any[];

  constructor(
    public activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private cartService: CartService,
    private apiService: ApiService,
    public dialog: MatDialog
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
      total: new FormControl('', [Validators.required])
    });
    this.states = Object.keys(states);
  }

  ngOnInit(): void {
    this.products$ = this.cartService.cart$;
    if(!this.products$){
      this.router.navigateByUrl('/');
    }
    this.cartService.subtotal$.subscribe((subtotal=>{
      this.subtotal = parseInt(subtotal);
    }));
    
    this.total = this.subtotal + this.deliveryFee;

    this.products$.subscribe((data:any)=>{
      this.form.get('products').setValue(JSON.stringify(data));
    });
    this.form.get('total').setValue(this.total);
    this.form.get('subtotal').setValue(this.subtotal);
  }

  onSubmit(){
    console.log(this.form.value);
    this.apiService.post('orders/create', this.form.value).subscribe((data:any)=>{
      console.log(data);
    },err=>{
      console.log(err);
    },()=>{
      this.cartService.clearCart();
      const dialogRef = this.dialog.open(InfoComponent, {
        width: '450px'
      });
    });
  }

  changeHandler(e){
    console.log(e.source.value);
    this.currentCities = states[e.source.value];
  }

}
