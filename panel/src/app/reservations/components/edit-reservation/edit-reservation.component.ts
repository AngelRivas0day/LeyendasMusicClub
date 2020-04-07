import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'app/services/services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.scss']
})
export class EditReservationComponent implements OnInit {

  form: FormGroup;
  item: any;
  isChecked: number;
  component: string = 'reservations';
  itemId: number;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialog: MatDialogRef<EditReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      people: new FormControl('', [Validators.required]),
      pref_zone: new FormControl('', [Validators.required]),
      checked: new FormControl('', [Validators.required]),
      achieved: new FormControl('', [Validators.required]),
    });
    this.isChecked = this.data.isChecked;
    this.itemId = 0;
  }

  ngOnInit() {
    this.itemId = this.data.id;
    console.log("Id del modal: " + this.itemId);
    this.fetchData(this.data.id);
  }

  saveChanges(id: number){
    const token = localStorage.getItem('access_token');
    this.form.get('checked').setValue(this.isChecked);
    this.apiService.put(`${this.component}/update`, id, this.form.value, token).subscribe((data:any)=>{
      console.log(data);
    },err=>{
      console.log(err);
    },()=>{
      this.dialog.close();
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log("on destroy");
    this.form.reset();
  }

  fetchData(id: number){
    const token = localStorage.getItem('access_token');
    console.log("Fetch data del modal: " + id);
    this.apiService.getOne(`${this.component}/list`, id).subscribe((data:any)=>{
      console.log(data[0]);
      this.item = data[0];
      this.form.patchValue(this.item);
    },err=>{
      console.log(err);
    });
  }

}
