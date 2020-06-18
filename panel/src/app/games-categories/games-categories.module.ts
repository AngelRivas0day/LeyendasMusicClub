import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesCategoriesRoutingModule } from './games-categories-routing.module';
import { GamesCategoriesComponent } from './components/games-categories/games-categories.component';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';


@NgModule({
  declarations: [GamesCategoriesComponent ],
  imports: [
    CommonModule,
    GamesCategoriesRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class GamesCategoriesModule { }
