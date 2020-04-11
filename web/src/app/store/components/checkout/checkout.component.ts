import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { CartService } from 'src/app/shared/services/cart.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from '../../../../environments/environment';

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

  constructor(
    public activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private cartService: CartService,
    private apiService: ApiService
  ) { 
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      paymentMethod: new FormControl('', [Validators.required]),
      pickup: new FormControl('', [Validators.required]),
      products: new FormControl('', [Validators.required]),
      subtotal: new FormControl('', [Validators.required]),
      total: new FormControl('', [Validators.required])
    });
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
    });
  }

}
