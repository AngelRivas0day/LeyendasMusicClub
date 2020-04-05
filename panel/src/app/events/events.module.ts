import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './components/events/events.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [EventsComponent, EditEventComponent, CreateEventComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    MaterialModule,
    MatNativeDateModule, 
    MatMomentDateModule,
  ],
  entryComponents: [
    EditEventComponent,
    CreateEventComponent
  ]
})
export class EventsModule { }
