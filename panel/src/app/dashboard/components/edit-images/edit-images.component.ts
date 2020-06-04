import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'app/services/services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-images',
  templateUrl: './edit-images.component.html',
  styleUrls: ['./edit-images.component.scss']
})
export class EditImagesComponent implements OnInit {

  selectedFile: File;
  values:any;
  fileName: any;
  image = new FormControl(null);
  edit: any;
  create: any;
  payload: any;

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<EditImagesComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { 
    this.edit = this.data.edit;
    this.create = this.data.create;
  }

  handleChange(event){
    this.selectedFile = <File>event.target.files[0];
    this.fileName = this.selectedFile.name;
  }

  updateImage(){
    const token = localStorage.getItem('access_token');
    if(this.data.edit){
      this.payload = {
        image: this.selectedFile,
        name: this.fileName
      };
      this.apiService.updateImage('carousel/update-image',this.data.id, token, this.payload).subscribe((data:any)=>{
        console.log(data);
      }, err =>{
        console.log(err);
      }, () => this.dialogRef.close());
    }else if(this.data.create){
      this.apiService.postImage('carousel/create', token, this.selectedFile, this.fileName).subscribe((data:any)=>{
        console.log(data);
      }, err =>{
        console.log(err);
      }, () => this.dialogRef.close());
    }
    
  }

  ngOnInit(): void {
  }

}
