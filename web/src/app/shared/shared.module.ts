import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { GroupProductsPipe } from './pipes/group-products.pipe';



@NgModule({
  declarations: [NavbarComponent, FooterComponent, GroupProductsPipe],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    HttpClientModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    GroupProductsPipe
  ]
})
export class SharedModule { }
