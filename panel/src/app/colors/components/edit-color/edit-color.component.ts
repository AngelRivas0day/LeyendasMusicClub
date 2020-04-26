import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'app/services/services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-color',
  templateUrl: './edit-color.component.html',
  styleUrls: ['./edit-color.component.scss']
})
export class EditColorComponent implements OnInit {

  public toggle: boolean = false;
  selectedColor: string;
  color: any;
  colorId: number;
  form: FormGroup;
  component: string = 'colors';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<EditColorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      hex: new FormControl('', [Validators.required])
    });
    this.colorId = this.data.id;
  }

  ngOnInit(): void {
    this.apiService.getOne(`${this.colorId}/list`, this.colorId).subscribe((data:any)=>{
      this.color = data[0];
      this.form.patchValue(data[0]);
      this.selectedColor = this.color.hex;
    },err=>{
      console.log(err);
    });
  }

  onSubmit(){
    this.form.get('hex').setValue(this.selectedColor);
    const token = localStorage.getItem('access_token');
    this.apiService.post(`${this.component}/update`, this.form.value, token).subscribe(
      (resp:any)=>console.log(resp),
      (err)=>console.log(err),
      ()=>this.dialogRef.close()
    );
  }
}
