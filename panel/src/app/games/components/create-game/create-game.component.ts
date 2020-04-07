import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'app/services/services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  form: FormGroup;
  selectedFile: File;
  values:any;
  categories: any[] = ['co-op','mistery','1vs1'];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<CreateGameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      category: new FormControl('', [Validators.required]),
      noPlayers: new FormControl('', [Validators.required]),
      recomendedPlayers: new FormControl('', [Validators.required]),
      timePerGame: new FormControl('', [Validators.required]),
      tutorial: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      type: new FormControl(0)
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(()=>{
      this.form.value.image = this.selectedFile;
      this.values = this.form.value;
    });
  }

  create(){
    const token = localStorage.getItem('access_token');
    // const newData = this.apiService.toFormData(this.form.value);
    // newData.append('image', this.selectedFile, this.selectedFile.name);
    // console.log(newData);
    this.apiService.postWithImage("games/create", this.form.value, token).subscribe((data: any)=>{
      console.log(data);
    }, err =>{
      console.log(err);
    },()=>{
      this.dialogRef.close();
    });
  }

  handleChange(event){
    this.selectedFile = <File>event.target.files[0];
    this.form.value.image = this.selectedFile;
  }

}
