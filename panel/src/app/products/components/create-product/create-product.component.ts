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
  selectedFiles: File[];
  values:any;
  // colors: any[];
  categories: any[];
  collections: any[];
  colors: any[] = [
    'rojo', 'blanco', 'negro', 'cafe', 'azul marino'
  ];

  constructor(
    public dialogRef: MatDialogRef<CreateProductComponent>,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('',[Validators.required]),
      // image: new FormControl(null),
      images: new FormControl('', [Validators.required]),
      colors: new FormControl('', [Validators.required]),
      noColors: new FormControl(''),
      category: new FormControl('',[Validators.required]),
      stock: new FormControl(0, [Validators.required]),
      price: new FormControl(0, [Validators.required]),
    });
  }

  ngOnInit(): void{
    this.form.valueChanges.subscribe((data)=> {
      this.form.value.images = <File[]>this.selectedFiles;
      this.values = this.form.value;
    });
  }

  create(){
    const token = localStorage.getItem('access_token');
    this.form.get('noColors').setValue(this.form.value.colors.length);
    console.log(this.form.value);
    // let formData = new FormData();
    // Array.from(this.form.value.images).forEach((item: File)=>console.log(item));
    // formData.append('images', this.form.value.images, this.form.value.images.name);
    // console.log(formData.get('images'));
    this.apiService.postWithImage('products/create', this.form.value, token).subscribe((data:any)=>{
      console.log(data);
    },(error)=>{
      console.log("Hubo un error al crear el producto");
      console.log(error);
    },()=>{
      this.dialogRef.close();
    });
  }

  handleChange(event){
    this.selectedFiles = <File[]>event.target.files;
    this.form.value.images = this.selectedFiles;
    console.log(this.form.value);
    console.log(this.selectedFiles);
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
