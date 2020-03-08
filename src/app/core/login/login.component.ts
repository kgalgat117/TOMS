import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import validator from 'validator';
import { Secret } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {
    email: '',
    password: ''
  }
  phnRegex = new RegExp(/([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/);

  constructor(private userService: UserService, private cookieService: CookieService, private router: Router, private secret: Secret) { }

  signin() {
    if (this.validateData()) {
      this.userService.userSignIn(this.user).subscribe(response => {
        this.cookieService.set('UID', response['token'], 1, '/', this.secret.HOST);
        localStorage.setItem('UID', response['token'])
        if (response['user']['role'] == 'tenent') {
          this.router.navigate(['/home'])
        } else {
          this.router.navigate(['/dashboard'])
        }
      }, err => {
        console.log(err)
      })
    }
  }

  validateData() {
    if (validator.isEmail(this.user.email) && this.user.password) {
      return true
    } else if (this.phnRegex.test(this.user.email) && this.user.password) {
      return true
    }
    return false
  }

  ngOnInit() {
  }

}
