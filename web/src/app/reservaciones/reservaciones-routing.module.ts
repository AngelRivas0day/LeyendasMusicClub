import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservacionesComponent } from './components/reservaciones/reservaciones.component';


const routes: Routes = [
  {
    path: '',
    component: ReservacionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservacionesRoutingModule { }
