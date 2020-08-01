import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'app/services/services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  form: FormGroup;
  event: any;
  selectedFile: File;
  values:any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<CreateEventComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any
  ) {
    this.form = this.formBuilder.group({
      image: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    })
   }

  handleChange(event: any){
    this.selectedFile = <File>event.target.files[0];
    this.form.value.image = this.selectedFile;
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(()=>{
      this.form .value.image = this.selectedFile;
      this.values = this.form .value;
    });
  }

  create(){
    const token = localStorage.getItem('access_token');
    this.apiService.postWithImage('events/create', this.form.value, token).subscribe(
      (resp:any)=>console.log(resp),
      (err)=>console.log(err),
      ()=>this.dialogRef.close()
    )
  }

}
