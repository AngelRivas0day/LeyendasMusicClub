import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './components/store/store.component';
import { ProductComponent } from './components/product/product.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { CartComponent } from './components/cart/cart.component';


@NgModule({
  declarations: [StoreComponent, ProductComponent, CartComponent],
  imports: [
    CommonModule,
    StoreRoutingModule,
    RouterModule,
    MaterialModule
  ]
})
export class StoreModule { }
