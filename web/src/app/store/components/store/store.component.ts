import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  products: any[];

  slides: any[] = [];

  baseUrl: string = environment.baseUrl + '/carousel/get-image/';

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
    public prodctsService: ProductsService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.fetchSlides();
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

  fetchSlides(){
    this.apiService.getAll('carousel/list').subscribe((resp:any)=>{
      this.slides = resp;
    });
  }

}
