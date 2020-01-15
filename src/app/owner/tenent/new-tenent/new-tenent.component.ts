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
    })
  }

  getTenent() {
    this.OwnerService.getTenent(this.tenentParams).subscribe(resp => {
      this.tenent = resp['result']
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
      })
    }
  }

  validateTenentData() {
    if (this.tenent.name && this.tenent.email && validator.isEmail(this.tenent.email) && this.tenent.phone && validator.isMobilePhone(this.tenent.phone + "", 'en-IN') && this.tenent.password && this.tenent.cpassword && (this.tenent.password == this.tenent.cpassword)) {
      // if (this.tenentPropertyFlag == 'yes') {
      //   if(this.tenent.tenent_properties.property && this.tenent.tenent_properties.meter_type && this.tenent.tenent_properties.monthly_rent && this.tenent.tenent_properties.e_rate_per_unit && this.tenent.tenent_properties.security_deposit && this.tenent.tenent_properties.tenure_start && this.tenent.tenent_properties.tenure_end){
      return true
      //   }else{
      //     return false
      //   }
      // }else{
      //   return true
      // }
    } else {
      return false
    }
    // if (this.tenent.name && this.tenent.tenent_properties.meter_type && this.tenent.tenent_properties.e_rate_per_unit && this.tenent.tenent_properties.monthly_rent) {
    //   return true
    // }
    // return false
  }

}
