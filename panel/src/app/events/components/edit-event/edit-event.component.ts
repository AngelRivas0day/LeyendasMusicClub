import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'app/services/services';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  form: FormGroup;
  event: any;
  selectedFile: File;
  values:any;


  constructor(
    public dialogRef: MatDialogRef<EditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    public formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      image: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });
  }

  handleChange(event: any){
    this.selectedFile = <File>event.target.files[0];
    this.form.value.image = this.selectedFile;
  }

  ngOnInit() {
    this.fetchEvent(this.data.id);
    this.form.valueChanges.subscribe(()=>{
      this.form .value.image = this.selectedFile;
      this.values = this.form .value;
    });
  }

  fetchEvent(id) {
    if (this.data.id) {
      this.apiService.getOne('events/list',id).subscribe((data: any) => {
        console.log("data: ");
        console.log(data);
        this.event = data;
        this.form.patchValue(data);
      },(error)=>{
        console.log("Hubo un error al traer la informacion del producto con el id: "+id);
        console.log(error);
      },()=>{
        this.form.get('date').setValue(new Date(this.event.date));
      });
    }
  }

  saveChanges(id) {
    let token = localStorage.getItem('access_token');
    this.apiService.updateWithImage('events/update', id, this.form.value, this.selectedFile, token).subscribe((data) => {
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
