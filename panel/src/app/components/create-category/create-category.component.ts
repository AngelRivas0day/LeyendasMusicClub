import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'app/services/services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  component: string;
  type: number;
  form: FormGroup;
  types: any[] = [
    {
      id: 1,
      number: 1,
      name: 'Juegos de mesa'
    },
    {
      id: 2,
      number: 0,
      name: 'Maquinitas'
    }
  ];

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateCategoryComponent>
  ) { 
    this.component = this.data.type;
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    if(this.component == 'games'){
      this.type = 1;
    }else if(this.component == 'machines'){
      this.type = 0;
    }
  }

  onSubmit(){
    const token = localStorage.getItem('access_token');
    // this.form.get('type').setValue(this.type);
    this.apiService.post(`${this.component}Categories/create`, this.form.value, token).subscribe((resp:any)=>{
      console.log(resp);
    },err=>{
      console.log(err);
    },()=>{
      this.dialogRef.close();
    });
  }

}
