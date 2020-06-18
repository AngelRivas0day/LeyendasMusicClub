import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'app/services/services';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.scss']
})
export class UpdateImageComponent implements OnInit {

  selectedFiles: File[] = [];
  values:any;
  component: string = 'products';
  colors: any[];
  form: FormGroup;
  imgArray: any[] = [];
  itemsId:number = 0;

  constructor(
    public dialogRef: MatDialogRef<UpdateImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) { 
    this.form = this.formBuilder.group({
      images: this.formBuilder.array([]),
      colors: new FormControl('', [Validators.required])
    });
  }


  handleChange(event){
    Array.from(<Array<File>>event.target.files).forEach((file: File, index)=>{
      console.log("File:",file);
      this.selectedFiles = [...this.selectedFiles, <File>file];
    });
    this.form.value.images = this.selectedFiles;
  }

  onColorSelect(event, value){
    var colorName = event.target.innerHTML;
    if(value){
      let item = {
        id: this.itemsId,
        name: colorName
      };
      this.addItem(item);
      this.itemsId += 1;
    }else{
      this.removeItem();
      this.itemsId -= 1;
    }
  }

  get imagesArray(){
    return this.form.get('images') as FormArray; 
  }

  addItem(item) {
    this.imgArray.push(item);
    this.imagesArray.push(this.formBuilder.control(null));
  }

 removeItem() {
    this.imgArray.pop();
    this.imagesArray.removeAt(this.imagesArray.length - 1);
  }

  ngOnInit() {
    this.apiService.getOne('products/list', this.data.id).subscribe((resp:any)=>{
      console.log("Products: ", resp.colors);
      this.colors = resp.colors;
    });
  }

  onSubmit(){
    const token = localStorage.getItem('access_token');
    let colors = this.form.value.colors;
    this.form.value.colors = JSON.stringify(colors);
    let formData = new FormData();
    const files: Array<File> = this.selectedFiles;
    formData = this.apiService.toFormData(this.form.value);
    Array.from(files).forEach((file: File)=>{
      formData.append("images", file, file.name);
    });
    console.log(this.form.value);

    this.apiService.postMultipleImage(`${this.component}/update-image`,this.data.id, formData, token).subscribe((data:any)=>{
      console.log(data);
    }, err =>{
      console.log(err);
    }, () => this.dialogRef.close());
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
