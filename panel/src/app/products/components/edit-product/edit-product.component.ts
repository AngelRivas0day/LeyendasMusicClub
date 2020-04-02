import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'app/services/services';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  editProdForm: FormGroup;
  product: any;
  selectedFile: File;
  values:any;


  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    public formBuilder: FormBuilder
  ) {
    this.editProdForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('',[Validators.required]),
      imageUrl: new FormControl(null,[Validators.required]),
      category: new FormControl('',[Validators.required]),
      stock: new FormControl(0, [Validators.required]),
      price: new FormControl(0, [Validators.required]),
    });
  }

  ngOnInit() {
    this.getProduct(this.data.id);
    // this.editProdForm.valueChanges.subscribe(()=>{
    //   this.editProdForm.value.image = this.selectedFile;
    //   this.values = this.editProdForm.value;
    // });
  }

  getProduct(id) {
    if (this.data.id) {
      this.apiService.getProduct(id).subscribe((data: any) => {
        console.log("data: ");
        console.log(data[0]);
        this.product = data[0];
        this.editProdForm.patchValue(data[0]);
      },(error)=>{
        console.log("Hubo un error al traer la informacion del producto con el id: "+id);
        console.log(error);
      });
    }
  }

  saveChanges(id) {
    // const formData = new FormData();
    let token = localStorage.getItem('access_token');
    // console.log(this.editProdForm.get('image').value);
    this.apiService.updateProduct(id, token, this.editProdForm.value).subscribe((data) => {
      console.log("Si jalo el update");
      console.log(data);
    },(error)=>{
      console.log("Hubo un error al guardar los cambios del producto con el id: "+id);
      console.log(error);
    },()=>{
      this.dialogRef.close();
    });
  }

  // handleFile(event) {
  //   this.selectedFile = <File>event.target.files[0];
  //   this.editProdForm.value.image = this.selectedFile;
  // }

  // toFormData(formValue) {
  //   const formData = new FormData();
  //   for (const key of Object.keys(formValue)) {
  //     const value = formValue[key];
  //     if (value != null) {
  //       formData.append(key, value);
  //     }
  //   }
  //   return formData;
  // }

}
