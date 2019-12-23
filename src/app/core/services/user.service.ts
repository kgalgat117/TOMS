import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Secret } from 'src/app/shared/shared.module';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private secret: Secret) { }

  url = this.secret.DOMAIN_NAME + 'user/'

  userSignUp(data) {
    return this.http.post(this.url + 'signup', data)
  }

  userSignIn(data) {
    return this.http.post(this.url + 'signin', data)
  }
}
