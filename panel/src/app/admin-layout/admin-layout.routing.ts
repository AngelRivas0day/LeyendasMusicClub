import { Routes } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { IconsComponent } from '../icons/icons.component';
import { NotificationsComponent } from '../notifications/notifications.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      loadChildren: ()=>import('../dashboard/dashboard.module').then(m=>m.DashboardModule) },
    { path: 'productos',      loadChildren: ()=>import('../products/products.module').then(m=>m.ProductsModule)},
    { path: 'eventos',        loadChildren: ()=>import('../events/events.module').then(m=>m.EventsModule) },
    { path: 'reservaciones',  loadChildren: ()=>import('../reservations/reservations.module').then(m=>m.ReservationsModule) },
    { path: 'ordenes',        loadChildren: ()=>import('../orders/orders.module').then(m=>m.OrdersModule) },
    { path: 'juegos-de-mesa', loadChildren: ()=>import('../games/games.module').then(m=>m.GamesModule) },
    { path: 'maquinitas',     loadChildren: ()=>import('../machines/machines.module').then(m=>m.MachinesModule) },
    { path: 'colores',        loadChildren: ()=>import('../colors/colors.module').then(m=>m.ColorsModule) }
];
