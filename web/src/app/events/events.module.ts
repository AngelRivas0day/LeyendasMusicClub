import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './components/events/events.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [EventsComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,
    MaterialModule
  ]
})
export class EventsModule { }
