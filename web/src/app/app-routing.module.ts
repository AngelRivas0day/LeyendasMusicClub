import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'tienda',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'tienda',
        loadChildren: () => import('./store/store.module').then(m=>m.StoreModule)
      },
      {
        path: 'entretenimiento',
        loadChildren: () => import('./entretenimiento/entretenimiento.module').then(m=>m.EntretenimientoModule)
      },
      {
        path: 'eventos',
        loadChildren: () => import('./events/events.module').then(m=>m.EventsModule)
      },
      {
        path: "menu-bar",
        loadChildren: () => import('./menu-bar/menu-bar.module').then(m=>m.MenuBarModule)
      },
      {
        path: 'reservaciones',
        loadChildren: () => import('./reservaciones/reservaciones.module').then(m=>m.ReservacionesModule)
      },
      {
        path: 'ubicaciones',
        loadChildren: ()=>import('./locations/locations.module').then(m=>m.LocationsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
