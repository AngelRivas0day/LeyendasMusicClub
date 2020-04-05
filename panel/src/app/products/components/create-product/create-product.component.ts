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

  ngOnInit(){
    this.form.valueChanges.subscribe(()=>{
      this.form.value.image = this.selectedFile;
      this.values = this.form.value;
    });
  }

  // intentanto traer todos los colores y elementos disponles con los que se puede crear un producto
  // para ser metidos dentro de un select o un multiple select y crear productos
  // consultar relaciones en la base de datos para poder crear un flujo de creación correcto

  create(){
    const token = localStorage.getItem('access_token');
    this.apiService.createProduct(token, this.form.value).subscribe((data:any)=>{
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
