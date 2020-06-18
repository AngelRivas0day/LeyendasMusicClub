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

  form: FormGroup;
  component: string = 'products/categories'

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    const token = localStorage.getItem('access_token');
    this.apiService.post(`${this.component}/create`, this.form.value, token).subscribe((resp:any)=>{
      console.log(resp);
    },(err)=>console.log(err),
    ()=>this.dialogRef.close());
  }

}
