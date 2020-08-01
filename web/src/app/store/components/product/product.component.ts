import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { ApiService } from 'src/app/shared/services/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ProductSnackBarComponent } from '../product-snack-bar/product-snack-bar.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  isLoaded: boolean = false;
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
    },
    {
      id: 6,
      name: "XXL"
    },
    {
      id: 7,
      name: "XXXL"
    }
  ];
  normalSizes: any[] = [
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
      name: "XL"
    }
  ];
  defaultSizes: any[] = [
    {
      id: 1,
      name: 'unitalla'
    }
  ];
  colors: any[] = [];
  currentColor: any;
  currentColorIndex: number;
  currentSize: any;

  lastProds:any[] = [];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) { 

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getProduct(this.id);
    this.fetchData();
    this.openSnackBar();
  }

  openSnackBar() {
    this.snackBar.openFromComponent(ProductSnackBarComponent, {
      duration: 10 * 1000,
    });
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
    this.apiService.getOne('products/list', id).subscribe((data: any)=>{
      this.product = data;
      this.currentImage = data.image;
      this.allImages = data.images;
      this.currentImages = this.allImages[Object.keys(this.allImages)[0]];
      this.colors = this.product.colors;
    },(err)=>{
      console.log(err);
    },()=>{
      this.isLoaded = true;
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
      let newProduct = {
        id: product['id'],
        name: product['name'],
        image: product['image'],
        color: product['color'],
        size: product['size'],
        description: product['description']
      };
      if(this.currentSize.id == 6 || this.currentSize.id == 7){
        newProduct['price'] = product['price_extra'];
      }else{
        newProduct['price'] = product['price'];
      }
      this.cartService.addCart(newProduct, quantity);
    }else{
      alert('Formulario no lleno');
    }
  }

  setSize(value: any){
    this.currentSize = value;
  }

  setColor(value: any, index: number){
    this.currentColor = value.name;
    this.currentColorIndex = index;
    this.currentImages = (this.allImages[value.name]);
    this.currentImage = this.currentImages[0];
  }

  changeCurrentImage(image: string){
    this.currentImage = image;
  }

  fetchData(){
    this.apiService.getAll('products/list-new').subscribe(
      (data:any)=>this.lastProds = data,
      (err)=>console.log(err)
    )
  }

}
