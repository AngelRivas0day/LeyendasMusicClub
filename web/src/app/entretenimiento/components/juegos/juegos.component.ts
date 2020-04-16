import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/shared/services/games.service';
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
  categories: any[] = [
    {
      id: 1,
      name: 'co-op'
    },
    {
      id: 2,
      name: '1vs1'
    },
    {
      id: 3,
      name: 'mistery'
    },
    {
      id: 4,
      name: 'free for all'
    }
  ];

  constructor(
    public dialog: MatDialog,
    public apiService: ApiService
  ) { }

  fetchData(){
    this.apiService.getAll('machines/list').subscribe((data:any)=>{
      this.games = data;
    });
    // this.apiService.getAll('gamesCat/list').subscribe((data:any)=>{
    //   this.categories = data;
    // },err=>console.log(err));
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
