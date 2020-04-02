import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservacionesRoutingModule } from './reservaciones-routing.module';
import { ReservacionesComponent } from './components/reservaciones/reservaciones.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';


@NgModule({
  declarations: [ReservacionesComponent, SnackBarComponent],
  imports: [
    CommonModule,
    ReservacionesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ReservacionesModule { }
