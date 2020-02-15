import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../owner.service';
import { Router, ActivatedRoute } from '@angular/router';
import validator from 'validator';

@Component({
  selector: 'app-new-tenent',
  templateUrl: './new-tenent.component.html',
  styleUrls: ['./new-tenent.component.css']
})
export class NewTenentComponent implements OnInit {

  tenent: any = {
    tenent_properties: {},
    permanent_address: {}
  }
  tenentParams: any = {}
  tenentPropertyFlag: string = 'yes'

  properties: Array<object> = []
  propertiesParams: Object = {}
  phnRegex = new RegExp(/([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/);
  errorCodes: Array<number> = []

  constructor(private OwnerService: OwnerService, private router: Router, private activeRoute: ActivatedRoute) {
    this.activeRoute.queryParams.subscribe(params => {
      if (params['tenent']) {
        this.tenentParams.tenent = params['tenent']
        this.getTenent()
      }
    })
    // this.getProperties()
  }

  getProperties() {
    this.OwnerService.getProperties(this.propertiesParams).subscribe(resp => {
      console.log(resp)
      this.properties = resp['result']
    }, err => {
      console.log(err)
    })
  }

  checkBoxClicked(event) {
    if (event.target.checked) {
      this.tenentPropertyFlag = 'yes'
    } else {
      this.tenentPropertyFlag = 'no'
    }
  }

  updateTenent() {
    this.OwnerService.updateTenent(this.tenent, this.tenentParams).subscribe(resp => {
      this.router.navigate(['/dashboard/tenent'])
    }, err => {
      console.log(err)
      if (err.error && err.error.code && err.error.code == 11000) {
        this.errorCodes.push(11000)
      }
    })
  }

  emailChange() {
    this.errorCodes.splice(this.errorCodes.indexOf(11000), 1)
  }

  getTenent() {
    this.OwnerService.getTenent(this.tenentParams).subscribe(resp => {
      this.tenent = resp['result']
      if (!this.tenent.tenent_properties) {
        this.tenent.tenent_properties = {}
      }
      if (!this.tenent.permanent_address) {
        this.tenent.permanent_address = {}
      }
    }, err => {
      console.log(err)
    })
  }

  ngOnInit() {
  }

  newTenent() {
    if (this.validateTenentData()) {
      this.OwnerService.makeNewTenent(this.tenent, this.tenentParams).subscribe(resp => {
        this.router.navigate(['/dashboard/tenent'])
        // console.log(resp)
      }, err => {
        console.log(err)
        if (err.error && err.error.error.code && err.error.error.code == 11000) {
          this.errorCodes.push(11000)
        }
      })
    }
  }

  validateTenentData() {
    if (this.tenent.permanent_address.pincode && !validator.isPostalCode(this.tenent.permanent_address.pincode + "", 'IN')) {
      return false
    }
    if (this.tenent.email && !validator.isEmail(this.tenent.email)) {
      return false
    }
    if (!this.tenent.name || !this.tenent.phone || (this.tenent.phone && !this.phnRegex.test(this.tenent.phone))) {
      return false
    }
    if (!this.tenent._id && (!this.tenent.password || !this.tenent.cpassword || (this.tenent.password != this.tenent.cpassword))) {
      return false
    }
    return true
  }

}
