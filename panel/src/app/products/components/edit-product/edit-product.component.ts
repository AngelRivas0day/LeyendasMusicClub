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
      category: new FormControl('',[Validators.required]),
      stock: new FormControl(0, [Validators.required]),
      price: new FormControl(0, [Validators.required]),
    });
  }

  ngOnInit() {
    this.getProduct(this.data.id);
  }

  getProduct(id) {
    if (this.data.id) {
      this.apiService.getOne('products/list', id).subscribe((data: any) => {
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
    let token = localStorage.getItem('access_token');
    this.apiService.put('products/update', id, this.editProdForm.value, token).subscribe((data) => {
      console.log("Si jalo el update");
      console.log(data);
    },(error)=>{
      console.log("Hubo un error al guardar los cambios del producto con el id: "+id);
      console.log(error);
    },()=>{
      this.dialogRef.close();
    });
  }
}
