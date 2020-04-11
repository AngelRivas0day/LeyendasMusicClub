import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild("navbar", {read: ElementRef}) navbar: ElementRef;

  total$: Observable<number>;

  constructor(
    private cartService: CartService
  ) {
    this.total$ = this.cartService.cart$
    .pipe(
      map(items => {return items.length})
    );
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    console.log(this.navbar.nativeElement);
  }

  toggleNav(): void{
    if(this.navbar.nativeElement.classList.contains("closed")){
      this.navbar.nativeElement.classList.remove("closed");
      this.navbar.nativeElement.classList.add("open");
    }else if(this.navbar.nativeElement.classList.contains("open")){
      this.navbar.nativeElement.classList.remove("open");
      this.navbar.nativeElement.classList.add("closed");
    }
  }

  closeNav(): void{
    this.navbar.nativeElement.classList.remove("open");
    this.navbar.nativeElement.classList.add("closed");
  }

  navOptions: any[] = [
    { name: "tienda", path: "/tienda"},
    { name: "about", path: "/about"},
    { name: "eventos", path: "/eventos"},
    { name: "entretenimiento", path: "/entretenimiento"},
    { name: "Menú bar", path: "/menu-bar"},
    { name: "Reservaciones", path: "/reservaciones"}
  ]
}
