import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'app/services/services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.scss']
})
export class EditGameComponent implements OnInit {

  form: FormGroup;
  game: any;
  categories: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<EditGameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      noPlayers: new FormControl('', [Validators.required]),
      recomendedPlayers: new FormControl('', [Validators.required]),
      timePerGame: new FormControl('', [Validators.required]),
      tutorial: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  saveChanges(id){
    const token = localStorage.getItem('access_token');
    this.apiService.put("games/update", id, this.form.value, token).subscribe((data: any)=>{
      console.log(data);
    }, err =>{
      console.log(err);
    },()=>{
      this.dialogRef.close();
    });
  }

  fetchGame(){
    const token = localStorage.getItem('access_token');
    this.apiService.getOne('games/list', this.data.id).subscribe((data: any)=>{
      this.game = data[0];
      console.log(this.game);
    },(err)=>{
      console.log(err);
    },()=>{
      this.form.patchValue(this.game);
    });
  }

  fetchCategories(){
    this.apiService.getAll('gamesCategories/list').subscribe((resp:any)=>{
      console.log(resp);
      this.categories = resp;
      // this.form.get('category').patchValue(this.game.category.value);
    },(err)=>{
      console.log("Hubo un error: ", err);
    },()=>{
      this.fetchGame();
    });
  }

}
