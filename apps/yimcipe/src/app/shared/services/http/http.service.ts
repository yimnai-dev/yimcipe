import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient){}

  // baseUrl = 'http://8923-154-72-153-206.ngrok.io/api/v1.0'
  baseUrl = 'http://localhost:3333/api/v1.0'

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true
  }

  get(url: string, payload?: any) {
    return this.httpClient.get(`${this.baseUrl}/${url}`, payload);
  }

  post(url: string, payload?: any){
    return this.httpClient.post(`${this.baseUrl}/${url}`, payload, this.httpOptions);
  }

  update(url: string, payload: any){
    return this.httpClient.put(`${this.baseUrl}/${url}`, payload);
  }

  delete(url: string, payload: any){
    return this.httpClient.delete(`${this.baseUrl}/${url}`, payload);
  }
}
