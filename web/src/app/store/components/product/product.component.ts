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
  allImages: any[];
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
  colors: any[] = [];
  currentColor: any;
  currentColorIndex: number;
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
      this.product = data
      this.currentImage = data.image;
      this.allImages = data.images;
      this.currentImages = this.allImages[Object.keys(this.allImages)[0]];
      console.log(this.currentImages);
      this.colors = this.product.colors;
    });
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
  }

  setSize(value: any){
    this.currentSize = value.name;
  }

  setColor(value: any, index: number){
    this.currentColor = value.name;
    this.currentColorIndex = index;
    console.log(index);
    this.currentImages = (this.allImages[value.name]);
    this.currentImage = this.currentImages[0];
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
