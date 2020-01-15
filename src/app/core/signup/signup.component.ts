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

  constructor(private router: Router, private userService: UserService, private cookieService: CookieService) { }

  CreateUser() {
    if (this.validateData()) {
      this.userService.userSignUp(this.user).subscribe(response => {
        this.signin()
      }, err => {
        console.log(err)
      })
    }
  }

  signin() {
      this.userService.userSignIn(this.user).subscribe(response => {
        this.cookieService.set('UID', response['token'], 1, '/', 'localhost');
        if (response['user']['role'] == 'tenent') {
          this.router.navigate(['/home'])
        } else {
          this.router.navigate(['/dashboard'])
        }
      }, err => {
        console.log(err)
      })
  }

  validateData() {
    if (validator.isEmail(this.user.email) && this.user.name && this.user.password && this.user.cpassword && (this.user.password == this.user.cpassword) && this.user.role && validator.isMobilePhone(this.user.phone, 'en-IN') ) {
      return true
    }
    return false
  }

  ngOnInit() {
  }

}
