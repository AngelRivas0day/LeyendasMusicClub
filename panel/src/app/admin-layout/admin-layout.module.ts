import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { IconsComponent } from '../icons/icons.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { ComponentsModule } from 'app/components/components.module';
import { MaterialModule } from 'app/material/material.module';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    ComponentsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    UserProfileComponent,
    IconsComponent,
    NotificationsComponent
  ]
})

export class AdminLayoutModule {}
