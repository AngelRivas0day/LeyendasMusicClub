import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {

  isLoaded: boolean = false;

  products: any[] = [];

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
    nav: false,
    autoplay: true,
    autoplaySpeed: 950
  }

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.fetchSlides();
  }

  goToItem(id: number){
    this.router.navigateByUrl(`${this.router.url}/producto/${id}`);
  }

  getProducts(): void{
    this.apiService.getAll('products/list').subscribe((data: any)=>{
      console.log(data);
      this.products = data;
    },
    (err)=>{
      console.log(err);
    },()=>{
      setTimeout(()=>{
        this.isLoaded = true;
      },1500);
    });
  }

  fetchSlides(){
    this.apiService.getAll('carousel/list').subscribe((resp:any)=>{
      console.log(resp);
      this.slides = resp;
    });
  }

}
