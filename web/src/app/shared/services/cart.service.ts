import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: any[] = [];
  private cart = new BehaviorSubject<any[]>([]);
  isInCart: boolean = false;

  cart$ = this.cart.asObservable();

  constructor() { }

  addCart(product: any, q: number) {
    for(var i = 0; i < q; i++ ){
      this.products = [...this.products, product];
    }
    this.cart.next(this.products);
  }


}
