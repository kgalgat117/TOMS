import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import validator from 'validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: any = {
    email: '',
    name: '',
    password: ''
  }

  constructor(private router: Router, private userService: UserService) { }

  CreateUser() {
    if (this.validateData()) {
      this.userService.userSignUp(this.user).subscribe(response => {
        this.router.navigate(['/login'])
      }, err => {
        console.log(err)
      })
    }
  }

  validateData() {
    if (validator.isEmail(this.user.email) && this.user.name && this.user.password && this.user.role) {
      return true
    }
    return false
  }

  ngOnInit() {
  }

}
