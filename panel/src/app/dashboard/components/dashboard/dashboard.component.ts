import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ApiService } from 'app/services/services';
import { MatDialog } from '@angular/material/dialog';
import { EditImagesComponent } from '../edit-images/edit-images.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  carouselImages: any[] = [];
  baseUrl: string = environment.base_url + '/carousel/get-image/';

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog
  ){}

  ngOnInit(){
    this.fetchImages();
  }
  fetchImages(){
    this.apiService.getAll('carousel/list').subscribe((resp:any)=>{
      this.carouselImages = resp;
    });
  }

  createSlide(){
    const dialogRef = this.dialog.open(EditImagesComponent, {
      width: '600px',
      hasBackdrop: true,
      data: {
        edit: false,
        create: true
      }
    });
    dialogRef.afterClosed().subscribe(()=>{
      setTimeout(()=>this.fetchImages(),750);
    });
  }

  editImage(id: number, image: string){
    const dialogRef = this.dialog.open(EditImagesComponent, {
      width: '600px',
      hasBackdrop: true,
      data: {
        id: id,
        oldImage: image,
        edit: true,
        create: false
      }
    });
    dialogRef.afterClosed().subscribe(()=>{
      setTimeout(()=>this.fetchImages(),750);
    });
  }

  eraseImage(id: number){
    const token = localStorage.getItem('access_token');
    this.apiService.delete('carousel/delete', id, token).subscribe(
      (resp:any)=>console.log(resp),
      err=>console.log(err),
      ()=>setTimeout(()=>this.fetchImages(),750)
    );
  }

}
