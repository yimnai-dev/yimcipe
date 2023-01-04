import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient){}

  baseUrl = 'http://localhost:3333/api/v1.0'

  get(url: string, payload?: any) {
    return this.httpClient.get(`${this.baseUrl}/${url}`, payload);
  }

  post(url: string, payload?: any){
    return this.httpClient.post(`${this.baseUrl}/${url}`, payload);
  }

  update(url: string, payload: any){
    return this.httpClient.put(`${this.baseUrl}/${url}`, payload);
  }

  delete(url: string, payload: any){
    return this.httpClient.delete(`${this.baseUrl}/${url}`, payload);
  }
}
