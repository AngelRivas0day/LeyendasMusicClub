import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'app/services/services';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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
      imageUrl: new FormControl('', [Validators.required]),
      date: new FormControl(0, [Validators.required]),
    });
  }

  ngOnInit() {
    this.fetchEvent(this.data.id);
    // this.editProdForm.valueChanges.subscribe(()=>{
    //   this.editProdForm.value.image = this.selectedFile;
    //   this.values = this.editProdForm.value;
    // });
  }

  fetchEvent(id) {
    if (this.data.id) {
      this.apiService.getOne('events/list',id).subscribe((data: any) => {
        console.log("data: ");
        console.log(data[0]);
        this.event = data[0];
        this.form.patchValue(data[0]);
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
    this.apiService.put('event/update', id, this.form.value, token).subscribe((data) => {
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
