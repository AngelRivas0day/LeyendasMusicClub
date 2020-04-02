import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private api: ApiService,
    private http: HttpClient,
  ) { 
    
  }

  //********************************************************
  //
  //            C L I E N T S  M E T H O D S
  //
  //********************************************************

  public getClients(token_type,token){
    const headers = this.api.setHeaders(token);
    return this.http.get(this.api.base_url+'/clients',{headers}).pipe(
      retry(3),
      this.api.catchRequestError()
    );
  }

  eraseClient(id, token){
    const headers = this.api.setHeaders(token);
    return this.http.delete(this.api.base_url+"/clients/"+id,{headers}).pipe(
      retry(3),
      this.api.catchRequestError()
    );
  }

  getClient(id, token_type, token){
    const headers = this.api.setHeaders(token);
    return this.http.get(this.api.base_url+"/clients/"+id, {headers}).pipe(
      retry(3),
      this.api.catchRequestError()
    );
  }

  newClient(token,data){
    const headers = this.api.setHeaders(token);
    return this.http.post(this.api.base_url+'/clients',data,{headers}).pipe(
      retry(3),
      this.api.catchRequestError()
    );
  }

  updateClient(id, token,data){
    const headers = this.api.setHeaders(token);
    return this.http.post(this.api.base_url+"/clients/"+id,data,{headers}).pipe(
      retry(3),
      this.api.catchRequestError()
    );
  }

}
