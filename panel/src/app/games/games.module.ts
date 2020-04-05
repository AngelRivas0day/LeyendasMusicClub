import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './components/games/games.component';
import { EditGameComponent } from './components/edit-game/edit-game.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { UpdateImageComponent } from './components/update-image/update-image.component';
import { DataTablesModule } from 'angular-datatables';
import { MaterialModule } from 'app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [GamesComponent, EditGameComponent, CreateGameComponent, UpdateImageComponent],
  imports: [
    CommonModule,
    GamesRoutingModule,
    DataTablesModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    EditGameComponent, 
    CreateGameComponent, 
    UpdateImageComponent
  ]
})
export class GamesModule { }
