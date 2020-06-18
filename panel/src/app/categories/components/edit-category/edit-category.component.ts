import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'app/services/services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  form: FormGroup;
  component: string = 'products/categories';
  data_: any;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this.apiService.getOne(`${this.component}/list`, this.data.id).subscribe(
    (resp:any)=>this.data_ = resp,
    (err)=>console.log(err),
    ()=>this.form.patchValue(this.data_));
  }

  onSubmit(){
    const token = localStorage.getItem('access_token');
    this.apiService.put(`${this.component}/update`, this.data.id, this.form.value, token).subscribe((resp:any)=>{
      console.log(resp);
    },(err)=>console.log(err),
    ()=>this.dialogRef.close());
  }

}
