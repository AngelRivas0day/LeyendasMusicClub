import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'app/services/services';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  form: FormGroup;
  selectedFile: File;
  values:any;
  // colors: any[];
  categories: any[];
  collections: any[];

  constructor(
    public dialogRef: MatDialogRef<CreateProductComponent>,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('',[Validators.required]),
      image: new FormControl(null),
      category: new FormControl('',[Validators.required]),
      stock: new FormControl(0, [Validators.required]),
      price: new FormControl(0, [Validators.required]),
    });
  }

  ngOnInit(): void{

  }

  create(){
    const token = localStorage.getItem('access_token');
    this.apiService.post('products/create', this.form.value, token).subscribe((data:any)=>{
      console.log(data);
    },(error)=>{
      console.log("Hubo un error al crear el producto");
      console.log(error);
    },()=>{
      this.dialogRef.close();
    });
  }

  handleChange(event){
    this.selectedFile = <File>event.target.files[0];
    this.form.value.image = this.selectedFile;
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
