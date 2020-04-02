import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  events: any[] = [
    {
      id: 1,
      imageUrl: "...",
      date: "00/00/00"
    },
    {
      id: 2,
      imageUrl: "...",
      date: "00/00/00"
    },
    {
      id: 3,
      imageUrl: "...",
      date: "00/00/00"
    },
    {
      id: 4,
      imageUrl: "...",
      date: "00/00/00"
    },
    {
      id: 5,
      imageUrl: "...",
      date: "00/00/00"
    }
  ]

  baseUrl = environment.baseUrl;

  public setHeadersWithNoToken(){
    return new HttpHeaders({ // some hard coded headers but they work hella fine in here
      'Content-Type':'application/json; charset=utf-8',
    });
  }

  constructor(
    private http: HttpClient
  ) { }

  getEvents(): any{
    const headers = this.setHeadersWithNoToken();
    return this.http.get(this.baseUrl+"/events/list", {headers}).pipe(
      retry(3)
    );
  }
}
