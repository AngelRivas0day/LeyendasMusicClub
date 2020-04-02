import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  products: any[];

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
