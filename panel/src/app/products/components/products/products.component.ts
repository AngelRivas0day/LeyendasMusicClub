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
  products: any[] = [];
  component: string = 'products';

  constructor(
    public apiService: ApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // this.fetchReserv();
    const that = this;
    this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    serverSide: true,
    processing: true,
    paging: false,
    // ordering: false,
    orderCellsTop: false,
    ordering: false,
    ajax: (DataTablesParemeters: any, callback) => {
      that.apiService.postDataTables(`${this.component}/dataTable`, DataTablesParemeters).
        subscribe((resp:any)=>{
          that.products = resp;
          callback({
            recordsTotal: resp.length,
            data: [] 
          });
        });
    },
    columns: [{data:'id'},{data:'image'},{data:'name'},{data:'category'},{data:'stock'},{data:'actions'}]
    };
  }

  openEditProduct(id):void{
    const dialogRef = this.dialog.open(EditProductComponent,{
      width: '700px',
      hasBackdrop: true,
      data: {
        id: id
      }
    });
  }

  openCreate(){
    const dialogRef = this.dialog.open(CreateProductComponent,{
      width: '800px',
      hasBackdrop: true,
      disableClose: true
    });
  }

  eraseProduct(id){
    const token = localStorage.getItem('access_token');
    this.apiService.delete('products/delete', id, token).subscribe((resp:any)=>{
      console.log('Se elminó el producto con éxito');
    },(error)=>{ 
      console.log(error);
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
  }
}
