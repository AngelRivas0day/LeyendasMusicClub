import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'app/services/services';
import { Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { CreateReservationComponent } from '../create-reservation/create-reservation.component';
import { EditReservationComponent } from '../edit-reservation/edit-reservation.component';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})

// class DataTablesResponse {
//   data: any[];
//   draw: number;
//   recordsTotal: number;
// }


export class ReservationsComponent implements OnInit {

  baseUrl = environment.base_url + '/games/get-image/';
  dtOptions: DataTables.Settings = {};
  reservations: any[] = [];
  currentDate = new Date();
  component: string = 'reservations';

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private http: HttpClient
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
      console.log(DataTablesParemeters);
      that.http.post('http://localhost:3000/reservations/dataTable/', DataTablesParemeters).
        subscribe((resp:any)=>{
          console.log("entradas: " + resp.length);
          that.reservations = resp;
          callback({
            recordsTotal: resp.length,
            data: [] 
          });
        });
      // that.apiService.getAll(`${that.component}/list`).subscribe((data:any)=>{
      //   console.log(data);
      //   that.reservations = data;
      // },err=>{
      //   console.log(err);
      // });
    },
    columns: [{data:'id'},{data:'name'},{data:'phone'},{data:'date'},{data:'people'},{data:'pref_zone'},{data:'actions'}]
    };
  }

  fetchReserv(){
    this.apiService.getAll(`${this.component}/list`).subscribe((data:any)=>{
      console.log(data);
      this.reservations = data;
    },err=>{
      console.log(err);
    });
  }

  openCreate(){
    const dialogRef = this.dialog.open(CreateReservationComponent,{
      width: '800px',
      hasBackdrop: true,
      disableClose: true
    });
    dialogRef.beforeClosed().subscribe(()=>{
    });
    dialogRef.afterClosed().subscribe(()=>{
        this.fetchReserv();
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
      setTimeout(()=>this.fetchReserv(), 700);
    });
  }

  achieve(id: number){
    const token = localStorage.getItem('access_token');
    this.apiService.put(`${this.component}/achieve`, id, {}, token).subscribe((data:any)=>{
      console.log(data);
    },err=>{
      console.log(err);
    },()=>{
      setTimeout(()=>this.fetchReserv(), 700);
      ;
    });
  }

  erase(id: number){
    const token = localStorage.getItem('access_token');
    this.apiService.delete(`${this.component}/delete`, id, token).subscribe((resp:any)=>{
      console.log('Se elminó la reservacion con éxito');
    },(error)=>{ 
      console.log(error);
    },()=>{
      setTimeout(()=>this.fetchReserv(), 700);
    });
  }

  openEdit(id: number, checked?: number){
    console.log("Id de la llamada del modal: " + id);
    const dialogRef = this.dialog.open(EditReservationComponent,{
      width: '700px',
      hasBackdrop: true,
      data: {
        id: id,
        isChecked: checked
      }
    });
    dialogRef.afterClosed().subscribe(()=>{
      setTimeout(()=>this.fetchReserv(), 700);
    });
  }
}
