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
  { path: '/colores', title: 'Colores', icon: 'design_palette', class: '' },
  { path: '/categorias-productos', title: 'Cat. Productos', icon: 'shopping_basket', class: '' },
  { path: '/eventos', title: 'Eventos', icon: 'design_bullet-list-67', class: '' },
  { path: '/reservaciones', title: 'Reservaciones', icon: 'education_agenda-bookmark', class: '' },
  { path: '/ordenes', title: 'Ordenes', icon: 'files_paper', class: '' },
  { path: '/juegos-de-mesa', title: 'Juegos de mesa', icon: 'sport_trophy', class: '' },
  { path: '/maquinitas', title: 'Maquinitas', icon: 'tech_controller-modern', class: '' },
  { path: '/categorias-juegos', title: 'Cat. Juegos', icon: 'tech_controller-modern', class: '' }
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
