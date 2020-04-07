import { Component, OnInit } from '@angular/core';
import { Subject, Observable, ObservableLike } from 'rxjs';
import 'rxjs/add/operator/map';
import { ApiService } from 'app/services/services';
import { MatDialog } from '@angular/material/dialog';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { CreateProductComponent } from '../create-product/create-product.component';
import { UpdateImageComponent } from '../update-image/update-image.component';

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
      this.dtTrigger.complete();
      this.getProducts();
    });
  }

  openCreate(){
    const dialogRef = this.dialog.open(CreateProductComponent,{
      width: '800px',
      hasBackdrop: true,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.dtTrigger.complete();
      this.getProducts();
    });
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  getProducts(){
      this.apiService.getAll('products/list').subscribe((resp:any)=>{
        console.log(resp);
        this.products = resp;
      },(error)=>{
        console.log("Hubo un error al traer los productos: ");
        console.log(error);
      },()=>{
        this.dtTrigger.next();
        console.log("se termino el evento");
      });
  }

  eraseProduct(id){
    const token = localStorage.getItem('access_token');
    this.apiService.delete('products/delete', id, token).subscribe((resp:any)=>{
      console.log('Se elminó el producto con éxito');
    },(error)=>{ 
      console.log(error);
    },()=>{
      this.dtTrigger.complete();
      setTimeout(()=>this.getProducts(), 1000);
    });
  }

  openUpdateImage(id: number){
    const dialogRef = this.dialog.open(UpdateImageComponent,{
      width: '400px',
      hasBackdrop: true,
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.dtTrigger.complete();
      this.getProducts();
    });
  }
}
