import { Component, OnInit } from '@angular/core';
import { EditColorComponent } from '../edit-color/edit-color.component';
import { CreateColorComponent } from '../create-color/create-color.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'app/services/services';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  colors: any[] = [];
  component:string = 'colors';

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog
  ) { }

  fetchData() {
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
    ajax: (DataTableParemeters: any, callback) => {
      that.apiService.postDataTables(`${that.component}/dataTable/`, DataTableParemeters).
      subscribe((resp:any)=>{
        that.colors = resp;
        console.log(resp);
        callback({
          recordsTotal: resp.length,
          data: [] 
        });
      });
    },
    columns: [
      {data:'id'},
      {data:'hex'},
      {data:'name'},
      {data:'hex'},
      {data:'actions'}
    ]
  };
}

  ngOnInit(){
    this.fetchData();
  }

  rerender(){
    this.apiService.getAll(`${this.component}/list`).subscribe((resp:any)=>{
      this.colors = resp;
    });
  }

  openCreate(){
    const dialogRef = this.dialog.open(CreateColorComponent,{
      width: '800px',
      hasBackdrop: true,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(()=>{
     setTimeout(()=>this.rerender(),750);
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }

  erase(id: number){
    const token = localStorage.getItem('access_token');
    this.apiService.delete(`${this.component}/delete`, id, token).subscribe((resp:any)=>{
      console.log('Se elminó el producto con éxito');
    },(error)=>{ 
      console.log(error);
    },()=>{
     setTimeout(()=>this.rerender(),750);
    });
  }

  openEdit(id: number){
    const dialogRef = this.dialog.open(EditColorComponent,{
      width: '700px',
      hasBackdrop: true,
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(()=>{
      setTimeout(()=>this.rerender(),750);
    });
  }
}
