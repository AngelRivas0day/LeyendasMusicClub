import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private meta: Meta
  ){
    // this.meta.addTags([
    //   {name: 'title', content: 'Leyendas Music Club'},
    //   {name: 'description', content: 'Leyendas Music Club es una tienda y restaurante bar.'},
    //   {property: 'og:url', content: 'http://leyendas.club/'},
    //   {property: 'og:type', content: 'website'},
    //   {property: 'og:title',  content: 'Leyendas Music Club'},
    //   {property: 'og:description', content: 'Leyendas Music Club, donde las leyendas nunca mueren.'},
    //   {property: 'og:image', content: 'https://res.cloudinary.com/drs3muxpe/image/upload/v1593238685/logo_nuqmpy.jpg'}
    // ],true);
  }
  title = 'LeyendasMusicClub';
}
