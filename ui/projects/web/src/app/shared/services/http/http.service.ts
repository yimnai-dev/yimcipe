import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient){}

  // baseUrl = 'https://yimcipe-api.delightfulcoast-e2a4923f.westus2.azurecontainerapps.io/api/v1.0'
  baseUrl='https://yimcipeapi-neruszaumuy.b4a.run/api/v1.0'
  // baseUrl = 'http://localhost:3333/api/v1.0'


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}),
    withCredentials: true,
  }

  get(url: string, payload?: any) {
    return this.httpClient.get(`${this.baseUrl}/${url}`, payload);
  }

  post(url: string, payload?: any){
    return this.httpClient.post(`${this.baseUrl}/${url}`, payload, {...this.httpOptions});
  }

  update(url: string, payload: any, options?: any){
    return this.httpClient.put(`${this.baseUrl}/${url}`, payload, options);
  }

  delete(url: string, payload: any){
    return this.httpClient.delete(`${this.baseUrl}/${url}`, payload);
  }
}
