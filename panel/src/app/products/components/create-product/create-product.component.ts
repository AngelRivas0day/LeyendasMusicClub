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
  selectedFiles: Array<File>;
  values:any;
  // colors: any[];
  categories: any[];
  collections: any[];
  colors: any[] = [];

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
      this.form.value.images = <Array<File>>this.selectedFiles;
      this.values = this.form.value;
      let colors = this.form.value.colors;
      this.form.value.colors = JSON.stringify(colors);
      console.log(this.form.value.colors);
    });
    this.apiService.getAll('colors/list').subscribe((resp:any)=>{
      this.colors = resp;
    })
  }

  create(){
    const token = localStorage.getItem('access_token');
    this.form.get('noColors').setValue(this.form.value.colors.length);
    console.log(this.form.value);
    let formData = new FormData();
    const files: Array<File> = this.selectedFiles;
    console.log("Files", files);
    formData = this.apiService.toFormData(this.form.value);
    Array.from(files).forEach((file: File)=>{
      console.log("File", file);
      formData.append("images", file, file.name);
    });
    // this.form.get('colors').setValue()
    let colors = this.form.value.colors;
    this.form.value.colors = JSON.stringify(colors);
    console.log(this.form.value);
    this.apiService.post('products/create', formData, token).subscribe((data:any)=>{
      console.log(data);
    },(error)=>{
      console.log("Hubo un error al crear el producto");
      console.log(error);
    },()=>{
      this.dialogRef.close();
    });
  }

  handleChange(event){
    this.selectedFiles = <Array<File>>event.target.files;
    this.form.value.images = this.selectedFiles;
    console.log(this.form.value);
    console.log(this.selectedFiles);
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
