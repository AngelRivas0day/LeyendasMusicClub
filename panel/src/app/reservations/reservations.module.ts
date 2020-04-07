import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { EditReservationComponent } from './components/edit-reservation/edit-reservation.component';
import { CreateReservationComponent } from './components/create-reservation/create-reservation.component';
import { MaterialModule } from 'app/material/material.module';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ReservationsComponent, EditReservationComponent, CreateReservationComponent],
  imports: [
    CommonModule,
    ReservationsRoutingModule,
    MaterialModule,
    DataTablesModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents: [
    EditReservationComponent, 
    CreateReservationComponent
  ]
})
export class ReservationsModule { }
