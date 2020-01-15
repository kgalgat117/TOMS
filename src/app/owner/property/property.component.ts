import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../owner.service';
import { Router } from '@angular/router';
import { prepareSyntheticPropertyName } from '@angular/compiler/src/render3/util';

declare var $: any;

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  properties: Array<object> = []
  propertiesParams: Object = {}

  newTenent: any = {
    email: ''
  }

  tenents: Array<object> = []
  tenentsParams: Object = {}

  constructor(private ownerService: OwnerService, private router: Router) {
    this.getProperties()
    this.getTenents()
  }

  updateTenentData(property, index) {
    this.newTenent.property = property._id
    this.newTenent.property_index = index
  }

  getTenents() {
    this.ownerService.getTenents(this.tenentsParams).subscribe(resp => {
      console.log(resp)
      this.tenents = resp['result']
    }, err => {
      console.log(err)
    })
  }

  deleteTenent(property, tenent, property_index) {
    this.ownerService.removePropertyTenent({ property: property._id, tenent: tenent._id }).subscribe(resp => {
      this.properties[property_index] = resp['result']
    })
  }

  assignTenent() {
    if (this.validateNewTenentData()) {
      let index = this.properties[this.newTenent.property_index]['tenent'].findIndex(item => {
        if (item._id == this.newTenent.tenent) {
          return true
        }
        return false
      })
      if (index == -1) {
        this.ownerService.assignPropertyTenent(this.newTenent).subscribe(resp => {
          // this.router.navigate(['/dashboard/tenent'])
          $('#paymentModal').modal('hide')
          this.properties[this.newTenent.property_index] = resp['result']
          this.newTenent = {}
        }, err => {
          console.log(err)
        })
      } else {
        $('#paymentModal').modal('hide')
        this.newTenent = {}
        console.log('already exist')
      }
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
    if (this.newTenent.tenent) {
      return true
    }
    return false
  }

  ngOnInit() {
  }

}
