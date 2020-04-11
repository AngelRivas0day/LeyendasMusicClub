import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './components/store/store.component';
import { ProductComponent } from './components/product/product.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { CartComponent } from './components/cart/cart.component';
import { SharedModule } from '../shared/shared.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [StoreComponent, ProductComponent, CartComponent, CheckoutComponent],
  imports: [
    CommonModule,
    StoreRoutingModule,
    RouterModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class StoreModule { }
