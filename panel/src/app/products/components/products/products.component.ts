import { Component, OnInit } from '@angular/core';
import { Subject, Observable, ObservableLike } from 'rxjs';
import 'rxjs/add/operator/map';
import { ApiService } from 'app/services/services';
import { MatDialog } from '@angular/material/dialog';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { CreateProductComponent } from '../create-product/create-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject;
  products: any[] = [];

  constructor(
    public apiService: ApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.getProducts();
  }

  openEditProduct(id):void{
    const dialogRef = this.dialog.open(EditProductComponent,{
      width: '700px',
      hasBackdrop: true,
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(()=>{
        this.getProducts();
    });
  }

  openCreate(){
    const dialogRef = this.dialog.open(CreateProductComponent,{
      width: '800px',
      hasBackdrop: true,
      disableClose: true
    });
    dialogRef.beforeClose().subscribe(()=>{
      this.getProducts();
    });
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  getProducts(){
      this.apiService.getProducts().subscribe((resp:any)=>{
        console.log(resp);
        this.products = resp;
      },(error)=>{
        console.log("Hubo un error al traer los productos: ");
        console.log(error);
      },()=>{
        console.log("se termino el evento");
      });
  }

  eraseProduct(id){
    const token = localStorage.getItem('access_token');
    console.log(token);
    this.apiService.eraseProduct(id, token).subscribe((resp:any)=>{
      console.log('Se elminó el producto con éxito');
    },(error)=>{ 
      console.log(error);
    },()=>{
      this.getProducts();
    });
  }
}
