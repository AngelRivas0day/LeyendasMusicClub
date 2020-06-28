import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntretenimientoRoutingModule } from './entretenimiento-routing.module';
import { MainComponent } from './components/main/main.component';
import { JuegosComponent } from './components/juegos/juegos.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { GameComponent } from './components/game/game.component';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';


@NgModule({
  declarations: [MainComponent, JuegosComponent, GameComponent],
  imports: [
    CommonModule,
    EntretenimientoRoutingModule,
    RouterModule,
    MaterialModule,
    HttpClientModule,
    NgPipesModule
  ],
  entryComponents: [
    GameComponent
  ]
})
export class EntretenimientoModule { }
