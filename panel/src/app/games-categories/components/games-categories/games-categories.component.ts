import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/services';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from 'app/components/create-category/create-category.component';
import { EditCategoryComponent } from 'app/components/edit-category/edit-category.component';

@Component({
  selector: 'app-games-categories',
  templateUrl: './games-categories.component.html',
  styleUrls: ['./games-categories.component.scss']
})
export class GamesCategoriesComponent implements OnInit {

  baseUrl = environment.base_url + '/games/get-image/';
  dtOptions: DataTables.Settings = {};
  items: any[] = [];
  component: string = 'gamesCategories';

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
      that.apiService.postDataTables(`${this.component}/dataTable/all`, DataTablesParemeters).
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
      {data:'category'},
      {data:'actions'}
    ]
    };
  }

  fetchData(){
    this.apiService.getAll(`${this.component}/list/all`).subscribe((data:any)=>{
      console.log(data);
      this.items = data;
    },err=>{
      console.log(err);
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
      width: '700px',
      hasBackdrop: true,
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(()=>{
      setTimeout(()=>this.fetchData(), 700);
    });
  }

  createCat(){
    const dialogRef = this.dialog.open(CreateCategoryComponent,{
      width: '700px',
      hasBackdrop: true,
      data: {
        type: this.component
      }
    });
    dialogRef.afterClosed().subscribe(()=>{
      setTimeout(()=>this.fetchData(),750);
    });
  }

}
