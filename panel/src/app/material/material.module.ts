import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'; 
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon'; 
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatChipsModule} from '@angular/material/chips';  
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material';

@NgModule({
  imports: [
    MatDialogModule
  ],
  exports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatTabsModule,
    MatSelectModule,
    MatStepperModule,
    MatChipsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
