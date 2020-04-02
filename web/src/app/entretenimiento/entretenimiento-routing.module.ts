import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { JuegosComponent } from './components/juegos/juegos.component';
import { MaquinasComponent } from './components/maquinas/maquinas.component';
import { GameComponent } from './components/game/game.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'maquinitas',
    component: MaquinasComponent
  },
  {
    path: 'juegos-de-mesa',
    component: JuegosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntretenimientoRoutingModule { }
