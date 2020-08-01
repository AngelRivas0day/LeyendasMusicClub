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
import { CarouselModule } from 'ngx-owl-carousel-o';
import { InfoComponent } from './components/info/info.component';
import { NgPipesModule } from 'ngx-pipes';
import { ProductSnackBarComponent } from './components/product-snack-bar/product-snack-bar.component';
import { NgxStripeModule } from 'ngx-stripe';
import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [StoreComponent, ProductComponent, CartComponent, CheckoutComponent, InfoComponent, ProductSnackBarComponent],
  imports: [
    CommonModule,
    StoreRoutingModule,
    RouterModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    CarouselModule,
    NgPipesModule,
    NgxStripeModule.forRoot(environment.piblicKeyTest),
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
    })
  ],
  entryComponents: [
    InfoComponent
  ]
})
export class StoreModule { }
