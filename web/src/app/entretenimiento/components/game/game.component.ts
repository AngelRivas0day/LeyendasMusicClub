import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';

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
    private apiService: ApiService
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
      this.apiService.getOne('games/list',this.itemId).subscribe((data:any)=>{
        console.log(data);
        this.itemToShow = data[0];
      },err=>{
        console.log('Hubo un error');
        console.log(err);
      },()=>{
        this.isLoaded = true;
      });
    }else{
      this.apiService.getOne('machines/list', this.itemId).subscribe((data:any)=>{
        this.itemToShow = data[0];
      },
      err=>console.log(err),
      ()=>this.isLoaded = true);
    }
  }

}
