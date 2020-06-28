import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @ViewChild('item',{static: true}) item: ElementRef;

  socialMedia: any[] = [
    { name: 'facebook', icon: 'fa-facebook-f', color: '2e6086', url: 'https://www.facebook.com/leyendas2370' },
    { name: 'youtube', icon: 'fa-youtube', color: 'ab0003', url: 'https://www.youtube.com/user/leyendasdelrocktv' },
    { name: 'instagram', icon: 'fa-instagram', color: '416b93', url: 'https://www.instagram.com/leyendasmusicclub/' },
    { name: 'twitter', icon: 'fa-twitter', color: '2867B2', url: '' }
  ];

  constructor(
    private elementRef: ElementRef
  ) { 
  }

  ngOnInit(): void {
    this.item.nativeElement.addEventListener('click', function(){
      console.log("test");
    });
  }

  mouseEnter(color:any){
   this.elementRef.nativeElement.querySelector('.footer__social').style.backgroundColor = `#${color}`;
  }

  mouseLeft(){
    this.elementRef.nativeElement.querySelector('.footer__social').style.backgroundColor = '#eaeaea';
  }

  openMedia(url: string){
    window.open(url, '_blank');
  }

}
