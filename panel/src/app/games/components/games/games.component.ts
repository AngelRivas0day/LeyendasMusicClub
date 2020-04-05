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
  dtTrigger = new Subject();

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchGames();
  }

  fetchGames(){
    this.apiService.getAll('games/list').subscribe((data:any)=>{
      console.log(data);
      this.games = data;
      this.dtTrigger.next();
    },err=>{
      console.log(err);
    });
  }

  openCreate(){
    const dialogRef = this.dialog.open(CreateGameComponent,{
      width: '800px',
      hasBackdrop: true,
      disableClose: true
    });
    dialogRef.beforeClosed().subscribe(()=>{
      this.dtTrigger.unsubscribe();
    });
    dialogRef.afterClosed().subscribe(()=>{
        this.fetchGames();
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
        this.fetchGames();
        this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  erase(id: number){
    const token = localStorage.getItem('access_token');
    this.apiService.delete('games/delete', id, token).subscribe((resp:any)=>{
      console.log('Se elminó el producto con éxito');
    },(error)=>{ 
      console.log(error);
    },()=>{
      this.dtTrigger.complete();
      setTimeout(()=>{
        this.fetchGames();
      },1000);
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
      this.dtTrigger.complete();
      this.fetchGames();
    });
  }


}
