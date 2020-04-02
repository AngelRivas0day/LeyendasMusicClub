import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  baseUrl = environment.baseUrl;

  private setHeadersWithNoToken(){
    return new HttpHeaders({ // some hard coded headers but they work hella fine in here
      'Content-Type':'application/json; charset=utf-8',
    });
  }

  constructor(
    private http: HttpClient
  ) { }

  createReservation(data: any): any{
    const headers = this.setHeadersWithNoToken();
    return this.http.post(this.baseUrl+'/reservations/create', data,{headers}).pipe(
      retry(3),
    )
  }

}
