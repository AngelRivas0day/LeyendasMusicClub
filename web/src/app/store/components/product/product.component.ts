import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  imageUrl: string = environment.baseUrl + '/products/get-image/';
  quantity: number = 1;
  id:number;
  product: any;
  currentImage: any;
  currentImages: any[];
  completedForm: boolean = false;
  sizes: any[] = [
    {
      id: 1,
      name: "extra chica"
    },
    {
      id: 2,
      name: "chica"
    },
    {
      id: 3,
      name: "mediana"
    },
    {
      id: 4,
      name: "grande"
    },
    {
      id: 5,
      name: "extra grande"
    }
  ];
  colors: any[] = [
    {
      id: 1,
      name: "red"
    },
    {
      id: 2,
      name: "blue"
    },
    {
      id: 3,
      name: "black"
    },
    {
      id: 4,
      name: "white"
    },
    {
      id: 5,
      name: "brown"
    }
  ];
  currentColor: any;
  currentSize: any;

  lastProds:any[] = [];

  constructor(
    private route: ActivatedRoute,
    public prodctsService: ProductsService,
    private cartService: CartService,
    private router: Router,
  ) { 

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getProduct(this.id);
    this.fetchData();
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
      this.currentImage = data[0].image;
      this.currentImages = JSON.parse(data[0].images);
      this.currentImages.push(this.currentImage);
      console.log(data[0]);
    });
    // console.log(this.product);
    // this.currentImage = this.product.imageUrl;
    // this.currentImages = this.product.images;
  }

  goToItem(id: number){
    this.router.navigateByUrl(`/tienda/producto/${id}`);
    this.getProduct(id);
  }

  addProd(product: any[], quantity: number, color: any, size: any){
    if(this.currentColor && this.currentSize){
      product['color'] = color;
      product['size'] = size;
      console.log(product);
      this.cartService.addCart(product, quantity);
    }else{
      alert('Formulario no lleno');
    }
    // this.productClicked.emit(this.product.id);
  }

  setSize(value: any){
    this.currentSize = value.name;
  }

  setColor(value: any){
    this.currentColor = value.name;
  }

  changeCurrentImage(image: string){
    this.currentImage = image;
  }

  fetchData(){
    this.prodctsService.getLastProds().subscribe(
      (data:any)=>this.lastProds = data,
      (err)=>console.log(err)
    )
  }

}
