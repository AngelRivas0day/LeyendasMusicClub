import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ProductsComponent } from './components/products/products.component';


const routes: Routes = [
  { path: '', component: ProductsComponent},
  { path: 'crear', component: CreateProductComponent },
  { path: 'editar/:id', component: EditProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
