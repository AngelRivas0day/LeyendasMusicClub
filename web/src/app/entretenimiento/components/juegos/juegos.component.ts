import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameComponent } from '../game/game.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.scss']
})
export class JuegosComponent implements OnInit {
  baseUrl = environment.baseUrl + '/games/get-image/';
  games: any[] = [];
  categories: any[] = [];

  constructor(
    public dialog: MatDialog,
    public apiService: ApiService
  ) { }

  fetchData(){
    this.apiService.getAll('games/list').subscribe((data:any)=>{
      this.games = data;
      console.log(data);
    });
    this.apiService.getAll('gamesCategories/list').subscribe((data:any)=>{
      this.categories = data;
      console.log(data);
    },err=>console.log(err));
  }

  ngOnInit(): void {
    this.fetchData();
  }

  openGame(id: number){
    const dialogRef = this.dialog.open(GameComponent, {
      width: '600px',
      maxHeight: '80vH',
      data: {
        gameId: id,
        category: "boardgame"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
