import { Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { IconsComponent } from '../icons/icons.component';
import { NotificationsComponent } from '../notifications/notifications.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    // { path: 'user-profile',   component: UserProfileComponent },
    { path: 'productos',      loadChildren: ()=>import('../products/products.module').then(m=>m.ProductsModule)},
    { path: 'eventos',        loadChildren: ()=>import('../events/events.module').then(m=>m.EventsModule) },
    { path: 'reservaciones',  loadChildren: ()=>import('../reservations/reservations.module').then(m=>m.ReservationsModule) }
];
