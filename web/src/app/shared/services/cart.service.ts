import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: any[] = [];
  private cart = new BehaviorSubject<any[]>([]);
  subtotal$ = new BehaviorSubject<any>([]);
  private price: number = 0;
  isInCart: boolean = false;

  cart$ = this.cart.asObservable();

  constructor() { 
    this.subtotal$.next(this.price);
  }

  addCart(product: any, q: number) {
    for(var i = 0; i < q; i++ ){
      this.products = [...this.products, product];
      this.price += parseInt(product.price);
    }
    this.subtotal$.next(this.price);
    this.cart.next(this.products);
  }

  removeFromCart(product: any){
    const index = this.products.indexOf(product);
    this.price -= parseInt(product.price);
    this.products.splice(index, 1);
    this.subtotal$.next(this.price);
    this.cart.next(this.products);
  }

}
