import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/services';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { CreateCategoryComponent } from '../create-category/create-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  baseUrl = environment.base_url + '/games/get-image/';
  dtOptions: DataTables.Settings = {};
  items: any[] = [];
  component: string = 'products/categories';

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const that = this;
    this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    serverSide: true,
    processing: true,
    paging: false,
    orderCellsTop: false,
    ordering: false,
    ajax: (DataTablesParemeters: any, callback) => {
      that.apiService.postDataTables(`${this.component}/dataTable`, DataTablesParemeters).
        subscribe((resp:any)=>{
          that.items = resp;
          callback({
            recordsTotal: resp.length,
            data: [] 
          });
        });
    },
    columns: [
      {data:'id'},
      {data:'name'},
      {data:'actions'}
    ]
    };
  }

  fetchData(){
    this.apiService.getAll(`${this.component}/list`).subscribe((data:any)=>{
      console.log(data);
      this.items = data;
    },err=>{
      console.log(err);
    });
  }

  openCreate(){
    const dialogRef = this.dialog.open(CreateCategoryComponent,{
      width: '400px',
      hasBackdrop: true,
      disableClose: true
    });
    dialogRef.beforeClosed().subscribe(()=>{
    });
    dialogRef.afterClosed().subscribe(()=>{
        this.fetchData();
    });
  }

  erase(id: number){
    const token = localStorage.getItem('access_token');
    this.apiService.delete(`${this.component}/delete`, id, token).subscribe((resp:any)=>{
      console.log('Se elminó la categoria con éxito. ', resp);
    },(error)=>{ 
      console.log(error);
    },()=>{
      setTimeout(()=>this.fetchData(), 700);
    });
  }

  openEdit(id: number){
    const dialogRef = this.dialog.open(EditCategoryComponent,{
      width: '400px',
      hasBackdrop: true,
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(()=>{
      setTimeout(()=>this.fetchData(), 700);
    });
  }

}
