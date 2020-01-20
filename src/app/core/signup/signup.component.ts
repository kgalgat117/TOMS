import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import validator from 'validator';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: any = {
    email: '',
    name: '',
    password: '',
    role: 'owner'
  }

  process: string = 'inactive'

  errorCodes: Array<number> = []

  constructor(private router: Router, private userService: UserService, private cookieService: CookieService) { }

  CreateUser() {
    if (this.validateData()) {
      this.process = 'active'
      this.userService.userSignUp(this.user).subscribe(response => {
        console.log(response)
        this.signin()
      }, err => {
        this.process = 'inactive'
        if (err && err.error && err.error.code && err.error.code == 11000) {
          this.errorCodes.push(11000)
        }
        console.log(err)
      })
    }
  }

  emailChanged() {
    this.errorCodes.splice(this.errorCodes.indexOf(11000), 1)
  }

  signin() {
    this.userService.userSignIn(this.user).subscribe(response => {
      console.log('user signup')
      this.process = 'inactive'
      this.cookieService.set('UID', response['token'], 1, '/', 'localhost');
      if (response['user']['role'] == 'tenent') {
        this.router.navigate(['/home'])
      } else {
        this.router.navigate(['/dashboard'])
      }
    }, err => {
      this.process = 'inactive'
      console.log(err)
    })
  }

  validateData() {
    if (validator.isEmail(this.user.email) && this.user.name && this.user.password && this.user.cpassword && (this.user.password == this.user.cpassword) && this.user.role && validator.isMobilePhone(this.user.phone, 'en-IN')) {
      return true
    }
    return false
  }

  ngOnInit() {
  }

}
