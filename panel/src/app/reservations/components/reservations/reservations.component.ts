import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'app/services/services';
import { Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { CreateReservationComponent } from '../create-reservation/create-reservation.component';
import { EditReservationComponent } from '../edit-reservation/edit-reservation.component';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  baseUrl = environment.base_url + '/games/get-image/';
  dtOptions: DataTables.Settings = {};
  reservations: any[] = [];
  dtTrigger = new Subject();
  currentDate = new Date();
  timeZone = this.currentDate.getTimezoneOffset();
  constructor(
    private apiService: ApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchReserv();
  }

  fetchReserv(){
    this.apiService.getAll('reservations/list').subscribe((data:any)=>{
      console.log(data);
      this.reservations = data;
      this.dtTrigger.next();
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
      this.dtTrigger.unsubscribe();
    });
    dialogRef.afterClosed().subscribe(()=>{
        this.fetchReserv();
        this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  erase(id: number){
    const token = localStorage.getItem('access_token');
    this.apiService.delete('reservations/delete', id, token).subscribe((resp:any)=>{
      console.log('Se elminó la reservacion con éxito');
    },(error)=>{ 
      console.log(error);
    },()=>{
      this.dtTrigger.complete();
      setTimeout(()=>{
        this.fetchReserv();
      },1000);
    });
  }

  openEdit(id: number){
    const dialogRef = this.dialog.open(EditReservationComponent,{
      width: '700px',
      hasBackdrop: true,
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.dtTrigger.complete();
      this.fetchReserv();
    });
  }
}
