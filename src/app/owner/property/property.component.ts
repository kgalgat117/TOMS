import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../owner.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  properties: Array<object> = []
  propertiesParams: Object = {}

  newTenent: any = {}

  constructor(private ownerService: OwnerService, private router: Router) {
    this.getProperties()
  }

  updateTenentData(property) {
    this.newTenent.property = property._id
  }

  assignTenent() {
    if (this.validateNewTenentData()) {
      this.ownerService.assignPropertyTenent(this.newTenent).subscribe(resp => {
        // this.router.navigate(['/dashboard/tenent'])
        $('#paymentModal').modal('hide')
        this.newTenent = {}
      }, err => {
        console.log(err)
      })
    }
  }

  editProperty(property) {
    this.router.navigate(['/dashboard/property/update'], { queryParams: { property: property._id } })
  }

  getProperties() {
    this.ownerService.getProperties(this.propertiesParams).subscribe(resp => {
      console.log(resp)
      this.properties = resp['result']
    }, err => {
      console.log(err)
    })
  }

  validateNewTenentData() {
    if (this.newTenent.email && this.newTenent.rent && this.newTenent.meter_type && this.newTenent.e_rate_per_unit) {
      return true
    }
    return false
  }

  ngOnInit() {
  }

}
