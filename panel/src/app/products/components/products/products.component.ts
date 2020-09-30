import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { ApiService } from 'app/services/services';
import { MatDialog } from '@angular/material/dialog';
import { UpdateImageComponent } from '../update-image/update-image.component';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from 'app/components/delete-dialog/delete-dialog.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  products: any[] = [];
  component: string = 'products';
  private _closedDialog$ = new Subject<any>();

  constructor(
    public apiService: ApiService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    const that = this;
    this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10,
    serverSide: true,
    processing: true,
    paging: true,
    orderCellsTop: false,
    ordering: true,
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
    this.router.navigateByUrl(`productos/editar/${id}`)
  }

  onDelete(producto){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
        width: '350px',
        hasBackdrop: true,
        data: {
            itemType: 'producto',
            name: producto.name
        }
    })
    dialogRef.afterClosed()
        .pipe(
            takeUntil(this._closedDialog$)
        )
        .subscribe(data => {
            if(data){
                this.eraseProduct(producto.id)
            }
        })
}

  openCreate(){
    this.router.navigateByUrl('productos/crear')
  }

  rerender(){
    this.apiService.getAll(`${this.component}/list`).subscribe((resp:any)=>{
      this.products = resp;
    });
  }

  eraseProduct(id){
    const token = localStorage.getItem('access_token');
    this.apiService.delete('products/delete', id, token).subscribe((resp:any)=>{
    },(error)=>{ 
      console.log(error);
    },()=>{
      setTimeout(()=>this.rerender(),750);
    });
  }

  openUpdateImage(id: number){
    const dialogRef = this.dialog.open(UpdateImageComponent,{
      width: '600px',
      hasBackdrop: true,
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(()=>{
      setTimeout(()=>this.rerender(),750);
    });
  }

  ngOnDestroy(){
    this._closedDialog$.next()
    this._closedDialog$.complete()
  }

}
