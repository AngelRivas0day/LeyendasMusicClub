import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
  { path: '/productos', title: 'Productos', icon: 'shopping_basket', class: '' },
  { path: '/eventos', title: 'Eventos', icon: 'design_bullet-list-67', class: '' },
  { path: '/reservaciones', title: 'Reservaciones', icon: 'files_single-copy-04', class: '' },
  { path: '/ordenes', title: 'Ordenes', icon: 'files_single-copy-04', class: '' },
  { path: '/juegos-de-mesa', title: 'Juegos de mesa', icon: 'tech_controller-modern', class: '' },
  { path: '/maquinitas', title: 'Maquinitas', icon: 'files_single-copy-04', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter( menuItem => menuItem );
  }

  isMobileMenu() { return !( window.innerWidth > 991 ); };

}
