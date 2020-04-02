import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  quantity: number = 1;
  id:number;
  product: any;
  currentImage: any;
  currentImages: any[];
  sizes: any[] = [
    {
      id: 1,
      size: "extra chica"
    },
    {
      id: 2,
      size: "chica"
    },
    {
      id: 3,
      size: "mediana"
    },
    {
      id: 4,
      size: "grande"
    },
    {
      id: 5,
      size: "extra grande"
    }
  ];

  selectedSize: any;

  constructor(
    private route: ActivatedRoute,
    public prodctsService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getProduct(this.id);
  }

  plusQuantity(): void{
    this.quantity += 1;
  }

  minusQuantity(): void{
    if(this.quantity != 0){
      this.quantity -= 1;
    }
  }

  getProduct(id: number){
    this.prodctsService.getProduct(id).subscribe((data: any)=>{
      this.product = data[0];
      this.currentImage = data[0].imageUrl;
    });
    // console.log(this.product);
    // this.currentImage = this.product.imageUrl;
    // this.currentImages = this.product.images;
  }

  addProd(Product: any[], Quantity: number, Size: any){
    this.cartService.addCart(this.product, Quantity);
    // this.productClicked.emit(this.product.id);
  }

  setSize(value: any){
    this.selectedSize = value.size;
  }

  changeCurrentImage(id: number){
    this.currentImage = this.currentImages.filter(x => x.id == id)[0].url;
  }

}
