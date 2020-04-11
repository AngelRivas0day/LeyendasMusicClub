import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'app/services/services';
import { Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EditOrderComponent } from '../edit-order/edit-order.component';
import { CreateOrderComponent } from '../create-order/create-order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  baseUrl = environment.base_url + '/games/get-image/';
  dtOptions: DataTables.Settings = {};
  items: any[] = [];
  currentDate = new Date();
  component: string = 'orders';

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private http: HttpClient
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
      {data:'lastName'},
      {data:'phone'},
      {data:'email'},
      {data:'paymentMethod'},
      {data:'checked'},
      {data:'created_at'},
      {data:'delivered'},
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
    const dialogRef = this.dialog.open(CreateOrderComponent,{
      width: '800px',
      hasBackdrop: true,
      disableClose: true
    });
    dialogRef.beforeClosed().subscribe(()=>{
    });
    dialogRef.afterClosed().subscribe(()=>{
        this.fetchData();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }

  confirm(id: number){
    const token = localStorage.getItem('access_token');
    this.apiService.put(`${this.component}/confirm`, id, {}, token).subscribe((data:any)=>{
      console.log(data);
    },err=>{
      console.log(err);
    },()=>{
      setTimeout(()=>this.fetchData(), 700);
    });
  }

  achieve(id: number){
    const token = localStorage.getItem('access_token');
    this.apiService.put(`${this.component}/achieve`, id, {}, token).subscribe((data:any)=>{
      console.log(data);
    },err=>{
      console.log(err);
    },()=>{
      setTimeout(()=>this.fetchData(), 700);
    });
  }

  erase(id: number){
    const token = localStorage.getItem('access_token');
    this.apiService.delete(`${this.component}/delete`, id, token).subscribe((resp:any)=>{
      console.log('Se elminó la reservacion con éxito');
    },(error)=>{ 
      console.log(error);
    },()=>{
      setTimeout(()=>this.fetchData(), 700);
    });
  }

  openEdit(id: number, checked?: number){
    const dialogRef = this.dialog.open(EditOrderComponent,{
      width: '80vW',
      maxHeight: '90vH',
      hasBackdrop: true,
      data: {
        id: id,
        isChecked: checked
      }
    });
    dialogRef.afterClosed().subscribe(()=>{
      setTimeout(()=>this.fetchData(), 700);
    });
  }

}
