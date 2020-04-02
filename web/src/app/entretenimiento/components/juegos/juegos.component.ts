import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/shared/services/games.service';
import { MatDialog } from '@angular/material/dialog';
import { GameComponent } from '../game/game.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.scss']
})
export class JuegosComponent implements OnInit {

  games: any[];

  constructor(
    public gamesService: GamesService,
    public dialog: MatDialog,
  ) { }

  fetchGames(){
    // this.games = this.gamesService.getGames();
    this.gamesService.getGames().subscribe((data:any)=>{
      this.games = data;
      console.log(data);
    })
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
