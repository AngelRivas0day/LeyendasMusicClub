import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/shared/services/cart.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  deliveryFee: number = environment.deliveryFee;
  products$: Observable<any[]>;
  subtotal$: Observable<any[]>;
  imageUrl: string = 'http://localhost:3000/products/get-image/';
  productsToSend: any[];

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
    this.products$ = this.cartService.cart$;
    this.subtotal$ = this.cartService.subtotal$;
  }

  ngOnInit() {
  }

  minus(product:any){
    console.log(product);
    this.cartService.removeFromCart(product);
    setTimeout(()=>this.refresh(), 200);
  }

  plus(product:any){
    this.cartService.addCart(product, 1);
    setTimeout(()=>this.refresh(), 200);
  }

  refresh(){
    this.router.navigateByUrl('/tienda', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/tienda/carrito']);
    }); 
  }
}
