import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { MaterialModule } from 'app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { UpdateImageComponent } from './components/update-image/update-image.component';

import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';



@NgModule({
  declarations: [ProductsComponent, EditProductComponent, CreateProductComponent, UpdateImageComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    DataTablesModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'drs3muxpe'}),
  ],
  entryComponents: [
    EditProductComponent,
    CreateProductComponent,
    UpdateImageComponent
  ]
})
export class ProductsModule { }
