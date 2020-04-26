import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorsRoutingModule } from './colors-routing.module';
import { ColorsComponent } from './components/colors/colors.component';
import { EditColorComponent } from './components/edit-color/edit-color.component';
import { CreateColorComponent } from './components/create-color/create-color.component';
import { MaterialModule } from 'app/material/material.module';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';


@NgModule({
  declarations: [ColorsComponent, EditColorComponent, CreateColorComponent],
  imports: [
    CommonModule,
    ColorsRoutingModule,
    MaterialModule,
    DataTablesModule,
    ReactiveFormsModule,
    ColorPickerModule
  ],
  entryComponents: [
    EditColorComponent, CreateColorComponent
  ]
})
export class ColorsModule { }
