import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'app/services/services';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-color',
  templateUrl: './create-color.component.html',
  styleUrls: ['./create-color.component.scss']
})
export class CreateColorComponent implements OnInit {

  public toggle: boolean = false;
  color: any = '#333333';
  form: FormGroup;
  component: string = 'colors';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<CreateColorComponent>
  ) { 
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      hex: new FormControl('#333333', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.form.get('hex').setValue(this.color);
    const token = localStorage.getItem('access_token');
    this.apiService.post(`${this.component}/create`, this.form.value, token).subscribe(
      (resp:any)=>console.log(resp),
      (err)=>console.log(err),
      ()=>this.dialogRef.close()
    );
  }

}
