import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'app/services/services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-machine',
  templateUrl: './edit-machine.component.html',
  styleUrls: ['./edit-machine.component.scss']
})
export class EditMachineComponent implements OnInit {

  form: FormGroup;
  game: any;
  component: string = 'machines';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<EditMachineComponent>,
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
    this.fetchData();
  }

  saveChanges(id){
    const token = localStorage.getItem('access_token');
    this.apiService.put(`${this.component}/update`, id, this.form.value, token).subscribe((data: any)=>{
      console.log(data);
    }, err =>{
      console.log(err);
    },()=>{
      this.dialogRef.close();
    });
  }

  fetchData(){
    const token = localStorage.getItem('access_token');
    this.apiService.getOne(`${this.component}/list`, this.data.id).subscribe((data: any)=>{
      this.game = data[0];
    },(err)=>{
      console.log(err);
    },()=>{
      this.form.patchValue(this.game);
    });
  }

}
