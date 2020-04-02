import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuBarRoutingModule } from './menu-bar-routing.module';
import { MenuComponent } from './components/menu/menu.component';


@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MenuBarRoutingModule
  ]
})
export class MenuBarModule { }
