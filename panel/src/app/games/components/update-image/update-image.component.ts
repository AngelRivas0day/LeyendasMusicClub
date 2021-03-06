import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'app/services/services';


@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.scss']
})
export class UpdateImageComponent implements OnInit {

  selectedFile: File;
  values:any;
  fileName: any;
  payload: any;

  constructor(
    public dialogRef: MatDialogRef<UpdateImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
  ) { 
  }

  image = new FormControl(null);

  handleChange(event){
    this.selectedFile = <File>event.target.files[0];
    this.fileName = this.selectedFile.name;
  }

  ngOnInit() {
  }

  updateImage(){
    const token = localStorage.getItem('access_token');
    this.payload = {
      image: this.selectedFile,
      name: this.fileName
    };
    this.apiService.updateImage('games/update-image',this.data.id, token, this.payload).subscribe((data:any)=>{
      console.log(data);
    }, err =>{
      console.log(err);
    }, () => this.dialogRef.close());
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
