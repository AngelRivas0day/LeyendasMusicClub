import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './components/store/store.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';


const routes: Routes = [
  {
    path: '',
    component: StoreComponent
  },
  {
    path: 'producto/:id',
    component: ProductComponent
  },
  {
    path: 'carrito',
    component: CartComponent
  },
  {
    path: 'carrito/checkout',
    component: CheckoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
