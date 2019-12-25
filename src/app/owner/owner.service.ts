import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient) { }

  URL = 'http://localhost:4200/'

  makeNewProperty(data, params){
    return this.http.post(this.URL + 'property', data, {params: params})
  }

  getProperties(params){
    return this.http.get(this.URL + 'property/all', {params: params})
  }

  updateProperty(data, params){
    return this.http.put(this.URL + 'property', data, {params: params})
  }

  getProperty(params){
    return this.http.get(this.URL + 'property', {params: params})
  }

}
