import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/services';
import { Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { CreateMachineComponent } from '../create-machine/create-machine.component';
import { UpdateImageComponent } from '../update-image/update-image.component';
import { EditMachineComponent } from '../edit-machine/edit-machine.component';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnInit {

  baseUrl = environment.base_url + '/games/get-image/';
  dtOptions: DataTables.Settings = {};
  machines: any[] = [];
  dtTrigger = new Subject();
  component: string = 'machines';

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this.apiService.getAll(`${this.component}/list`).subscribe((data:any)=>{
      console.log(data);
      this.machines = data;
      this.dtTrigger.next();
    },err=>{
      console.log(err);
    });
  }

  openCreate(){
    const dialogRef = this.dialog.open(CreateMachineComponent,{
      width: '800px',
      hasBackdrop: true,
      disableClose: true
    });
    dialogRef.beforeClosed().subscribe(()=>{
      this.dtTrigger.unsubscribe();
    });
    dialogRef.afterClosed().subscribe(()=>{
        this.fetchData();
        this.dtTrigger.next();
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
    dialogRef.beforeClosed().subscribe(()=>{
      this.dtTrigger.unsubscribe();
    });
    dialogRef.afterClosed().subscribe(()=>{
        this.fetchData();
        this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  erase(id: number){
    const token = localStorage.getItem('access_token');
    this.apiService.delete(`${this.component}/delete`, id, token).subscribe((resp:any)=>{
      console.log('Se elminó el producto con éxito');
    },(error)=>{ 
      console.log(error);
    },()=>{
      this.dtTrigger.complete();
      setTimeout(()=>{
        this.fetchData();
      },1000);
    });
  }

  openEdit(id: number){
    const dialogRef = this.dialog.open(EditMachineComponent,{
      width: '700px',
      hasBackdrop: true,
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.dtTrigger.complete();
      this.fetchData();
    });
  }

}
