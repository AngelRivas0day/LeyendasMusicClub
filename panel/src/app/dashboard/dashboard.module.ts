import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditImagesComponent } from './components/edit-images/edit-images.component';
import { MaterialModule } from 'app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'app/components/components.module';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [DashboardComponent, EditImagesComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ComponentsModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  entryComponents: [
    EditImagesComponent
  ]
})
export class DashboardModule { }
