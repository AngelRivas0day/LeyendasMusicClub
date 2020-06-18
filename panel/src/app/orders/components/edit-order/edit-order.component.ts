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
  isChecked: number;

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
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      paymentMethod: new FormControl('', [Validators.required]),
      pickupMethod: new FormControl('', [Validators.required]),
      products: new FormControl('', [Validators.required]),
      subtotal: new FormControl('', [Validators.required]),
      total: new FormControl('', [Validators.required]),
      checked: new FormControl('', [Validators.required])
    });
    this.itemId = this.data.id;
    this.isChecked = this.data.isChecked;
   }

  ngOnInit(): void {
    this.fetchData();
  }

  saveChanges(id: number){
    const token = localStorage.getItem('access_token');
    this.form.get('checked').setValue(this.isChecked);
    this.apiService.put(`${this.component}/update`, id, this.form.value, token).subscribe(
      (resp:any)=>console.log(resp),
      (err)=>console.log(err),
      ()=>this.dialogRef.close()
    );
  }

  fetchData(){
    this.apiService.getOne(`${this.component}/list`, this.itemId).subscribe((resp:any)=>{
      console.log(resp);
      this.item = resp[0];
      this.form.patchValue(this.item);
      this.products = JSON.parse(this.item.products);
    },
    (err)=>console.log(err));
  }

}
