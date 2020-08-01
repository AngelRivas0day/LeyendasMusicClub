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
import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';

@NgModule({
  declarations: [MainComponent, JuegosComponent, GameComponent],
  imports: [
    CommonModule,
    EntretenimientoRoutingModule,
    RouterModule,
    MaterialModule,
    HttpClientModule,
    NgPipesModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
    })
  ],
  entryComponents: [
    GameComponent
  ]
})
export class EntretenimientoModule { }
