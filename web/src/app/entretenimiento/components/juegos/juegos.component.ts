import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameComponent } from '../game/game.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.scss']
})
export class JuegosComponent implements OnInit {

  component: string;
  games: any[] = [];

  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
    private route: ActivatedRoute
  ) { 
    this.route.paramMap.subscribe((params:any) => {
      if(params){
        if(params.params.category == 'maquinitas'){
          this.component = 'machines';
        }else if(params.params.category == 'juegos-de-mesa'){
          this.component = 'games';
        }
      }
    });
  }

  fetchData(){
    this.apiService.getAll(`${this.component}/list`).subscribe((data:any)=>{
      this.games = data;
      console.log(data);
    });
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
