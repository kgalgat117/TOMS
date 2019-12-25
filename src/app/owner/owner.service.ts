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

}
