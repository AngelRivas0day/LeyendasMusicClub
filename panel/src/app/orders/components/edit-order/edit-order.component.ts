import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'app/services/services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  form: FormGroup;
  component: string = 'orders';
  itemId: number;
  item: any;
  products: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditOrderComponent>
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      paymentMethod: new FormControl('', [Validators.required]),
      pickup: new FormControl('', [Validators.required]),
      products: new FormControl('', [Validators.required]),
      subtotal: new FormControl('', [Validators.required]),
      total: new FormControl('', [Validators.required])
    });
    this.itemId = this.data.id;
   }

  ngOnInit(): void {
    this.fetchData();
  }

  saveChanges(){
    const token = localStorage.getItem('access_token');
    this.apiService.put(`${this.component}/update`, this.itemId, this.form.value, token).subscribe(
      (resp:any)=>console.log(resp),
      (err)=>console.log(err),
      ()=>this.dialogRef.close()
    );
  }

  fetchData(){
    this.apiService.getOne(`${this.component}/list`, this.itemId).subscribe((resp:any)=>{
      console.log(resp[0]);
      this.item = resp[0];
      this.form.patchValue(this.item);
      this.products = JSON.parse(this.item.products);
      console.log(this.products);
    },
    (err)=>console.log(err));
  }

}
