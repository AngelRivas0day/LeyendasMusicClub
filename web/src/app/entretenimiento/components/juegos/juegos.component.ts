import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/shared/services/games.service';
import { MatDialog } from '@angular/material/dialog';
import { GameComponent } from '../game/game.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.scss']
})
export class JuegosComponent implements OnInit {
  baseUrl = environment.baseUrl + '/games/get-image/';
  games: any[] = [];
  misteryGames: any[];
  coopGames: any[];
  vsGames: any[];

  constructor(
    public gamesService: GamesService,
    public dialog: MatDialog,
  ) { }

  fetchGames(){
    // this.games = this.gamesService.getGames();
    this.gamesService.getGamePerCat().subscribe((data:any)=>{
      // this.games = data;
      this.coopGames = data.data[0].games;
      this.vsGames = data.data[1].games;
      this.misteryGames = data.data[2].games;
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.fetchGames();
  }

  openGame(id: number){
    const dialogRef = this.dialog.open(GameComponent, {
      width: '600px',
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
