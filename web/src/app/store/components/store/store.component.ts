import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  products: any[];

  slides: any[] = [
    {
      id: 1,
      src: 'https://source.unsplash.com/800x500?random',
      title: 'title',
      alt: 'alt text'
    },
    {
      id: 2,
      src: 'https://source.unsplash.com/random',
      title: 'title',
      alt: 'alt text'
    },
    {
      id: 3,
      src: 'https://source.unsplash.com/800x500?shirts',
      title: 'title',
      alt: 'alt text'
    }
  ];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  }

  constructor(
    private router: Router,
    public prodctsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  goToItem(id: number){
    this.router.navigateByUrl(`${this.router.url}/producto/${id}`);
  }

  getProducts(): void{
    // this.products = this.prodctsService.getProducts();
    this.prodctsService.getProducts().subscribe((data: any)=>{
      console.log(data);
      this.products = data;
    });
  }

}
