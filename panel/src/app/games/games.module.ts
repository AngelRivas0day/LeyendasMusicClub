import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './components/games/games.component';
import { EditGameComponent } from './components/edit-game/edit-game.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { UpdateImageComponent } from './components/update-image/update-image.component';


@NgModule({
  declarations: [GamesComponent, EditGameComponent, CreateGameComponent, UpdateImageComponent],
  imports: [
    CommonModule,
    GamesRoutingModule
  ],
  entryComponents: [
    EditGameComponent, 
    CreateGameComponent, 
    UpdateImageComponent
  ]
})
export class GamesModule { }
