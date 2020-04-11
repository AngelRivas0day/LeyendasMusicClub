import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/services';
import { Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { EditGameComponent } from '../edit-game/edit-game.component';
import { CreateGameComponent } from '../create-game/create-game.component';
import { UpdateImageComponent } from '../update-image/update-image.component';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  baseUrl = environment.base_url + '/games/get-image/';
  dtOptions: DataTables.Settings = {};
  games: any[] = [];
  component:string = 'games';
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
        that.games = resp;
        callback({
          recordsTotal: resp.length,
          data: [] 
        });
      });
    },
    columns: [{data:'id'},{data:'image'},{data:'name'},{data:'category'},{data:'actions'}]
    };
  }

  ngOnInit(){
    this.fetchData();
  }

  openCreate(){
    const dialogRef = this.dialog.open(CreateGameComponent,{
      width: '800px',
      hasBackdrop: true,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(()=>{
     setTimeout(()=>this.fetchData(),750);
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
     setTimeout(()=>this.fetchData(),750);
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }

  erase(id: number){
    const token = localStorage.getItem('access_token');
    this.apiService.delete('games/delete', id, token).subscribe((resp:any)=>{
      console.log('Se elminó el producto con éxito');
    },(error)=>{ 
      console.log(error);
    },()=>{
     setTimeout(()=>this.fetchData(),750);
    });
  }

  openEdit(id: number){
    const dialogRef = this.dialog.open(EditGameComponent,{
      width: '700px',
      hasBackdrop: true,
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(()=>{
      setTimeout(()=>this.fetchData(),750);
    });
  }


}
