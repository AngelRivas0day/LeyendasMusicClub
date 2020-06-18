import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';


@NgModule({
  declarations: [CategoriesComponent, EditCategoryComponent, CreateCategoryComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  entryComponents: [
    EditCategoryComponent, CreateCategoryComponent
  ]
})
export class CategoriesModule { }
