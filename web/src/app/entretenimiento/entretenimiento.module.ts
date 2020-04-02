import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntretenimientoRoutingModule } from './entretenimiento-routing.module';
import { MainComponent } from './components/main/main.component';
import { JuegosComponent } from './components/juegos/juegos.component';
import { MaquinasComponent } from './components/maquinas/maquinas.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { GameComponent } from './components/game/game.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [MainComponent, JuegosComponent, MaquinasComponent, GameComponent],
  imports: [
    CommonModule,
    EntretenimientoRoutingModule,
    RouterModule,
    MaterialModule,
    HttpClientModule
  ],
  entryComponents: [
    GameComponent
  ]
})
export class EntretenimientoModule { }
