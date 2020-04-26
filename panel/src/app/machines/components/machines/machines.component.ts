import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/services';
import { Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { CreateMachineComponent } from '../create-machine/create-machine.component';
import { UpdateImageComponent } from '../update-image/update-image.component';
import { EditMachineComponent } from '../edit-machine/edit-machine.component';
import { CreateCategoryComponent } from 'app/components/create-category/create-category.component';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnInit {

  baseUrl = environment.base_url + '/games/get-image/';
  dtOptions: DataTables.Settings = {};
  machines: any[] = [];
  component: string = 'machines';

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

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
        that.machines = resp;
        callback({
          recordsTotal: resp.length,
          data: [] 
        });
      });
    },
    columns: [{data:'id'},{data:'image'},{data:'name'},{data:'category'},{data:'actions'}]
    };
  }

  openCreate(){
    const dialogRef = this.dialog.open(CreateMachineComponent,{
      width: '800px',
      hasBackdrop: true,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(()=>{
        this.fetchData();
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
    dialogRef.afterClosed().subscribe(()=>{
        this.fetchData();
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
      this.fetchData();
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
