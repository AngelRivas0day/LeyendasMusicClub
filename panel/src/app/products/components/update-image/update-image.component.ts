import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'app/services/services';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.scss']
})
export class UpdateImageComponent implements OnInit {

  selectedFiles: Array<File>;
  values:any;
  component: string = 'products';
  colors: any[];
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) { 
    this.form = this.formBuilder.group({
      images: new FormControl(null, [Validators.required]),
      colors: new FormControl('', [Validators.required]),
      noColors: new FormControl('')
    });
  }


  handleChange(event){
    this.selectedFiles = <Array<File>>event.target.files;
    this.form.value.images = this.selectedFiles;
  }

  ngOnInit() {
    this.apiService.getAll('colors/list').subscribe((resp:any)=>{
      this.colors = resp;
    });
  }

  onSubmit(){
    const token = localStorage.getItem('access_token');

    this.form.get('noColors').setValue(this.form.value.colors.length);
    let formData = new FormData();
    const files: Array<File> = this.selectedFiles;
    formData = this.apiService.toFormData(this.form.value);
    Array.from(files).forEach((file: File)=>{
      console.log("File", file);
      formData.append("images", file, file.name);
    });


    this.apiService.updateImage(`${this.component}/update-image`,this.data.id, token, formData).subscribe((data:any)=>{
      console.log(data);
    }, err =>{
      console.log(err);
    }, () => this.dialogRef.close());
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
