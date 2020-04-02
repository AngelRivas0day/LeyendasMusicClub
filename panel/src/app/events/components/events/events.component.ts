import { Component, OnInit } from '@angular/core';
import { Subject, Observable, ObservableLike } from 'rxjs';
import 'rxjs/add/operator/map';
import { ApiService } from 'app/services/services';
import { MatDialog } from '@angular/material/dialog';
import { EditEventComponent } from '../edit-event/edit-event.component';
import { CreateEventComponent } from '../create-event/create-event.component';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject;
  events: any[] = [];

  constructor(
    public apiService: ApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.fetchEvents();
  }

  openEditProduct(id):void{
    const dialogRef = this.dialog.open(EditEventComponent,{
      width: '700px',
      hasBackdrop: true,
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(()=>{
        this.fetchEvents();
    });
  }

  openCreate(){
    const dialogRef = this.dialog.open(CreateEventComponent,{
      width: '800px',
      hasBackdrop: true,
      disableClose: true
    });
    dialogRef.beforeClose().subscribe(()=>{
      this.fetchEvents();
    });
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  fetchEvents(){
      this.apiService.getEvents().subscribe((resp:any)=>{
        console.log(resp);
        this.events = resp;
      },(error)=>{
        console.log("Hubo un error al traer los productos: ");
        console.log(error);
      },()=>{
        console.log("se termino el evento");
      });
  }

  eraseEvent(id){
    const token = localStorage.getItem('access_token');
    console.log(token);
    this.apiService.eraseEvent(id, token).subscribe((resp:any)=>{
      console.log('Se elminó el producto con éxito');
    },(error)=>{ 
      console.log(error);
    },()=>{
      this.fetchEvents();
    });
  }

}
