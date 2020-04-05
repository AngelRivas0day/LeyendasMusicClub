import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GamesService } from 'src/app/shared/services/games.service';
import { MachinesService } from 'src/app/shared/services/machines.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  itemToShow: any;
  category: string;
  itemId: number;
  isLoaded: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<GameComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public gamesService: GamesService,
    public machinesService: MachinesService
  ) { 
    console.log(data.gameId);
    this.category = data.category;
    this.itemId = data.gameId;
  }

  ngOnInit(): void {
    this.fetchGame();
  }

  fetchGame(){
    console.log('cat: ' + this.category);
    if(this.category == "boardgame"){
      this.gamesService.getGame(this.itemId).subscribe((data:any)=>{
        console.log(data);
        this.itemToShow = data[0];
      },err=>{
        console.log('Hubo un error');
      },()=>{
        this.isLoaded = true;
      });
    }else{
      this.itemToShow = this.machinesService.getProduct(this.itemId);
    }
  }

}
