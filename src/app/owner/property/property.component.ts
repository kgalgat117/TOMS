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

  newTenent: any = {
    email: ''
  }

  tenents: Array<object> = []
  tenentsParams: Object = {}

  delete_data: any = {}

  filter: string = ''

  temp_properties: Array<Object> = []

  constructor(private ownerService: OwnerService, private router: Router) {
    this.getProperties()
    this.getTenents()
  }

  filterProperties() {
    if (this.filter == '') {
      this.properties = this.temp_properties
    } else if (this.filter == 'available') {
      this.properties = this.temp_properties.filter(item => {
        if (item['tenent'].length == 0) {
          return true
        }
        return false
      })
    } else if (this.filter == 'unavailable') {
      this.properties = this.temp_properties.filter(item => {
        if (item['tenent'].length == 0) {
          return false
        }
        return true
      })
    }
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

  deleteTenent() {
    this.ownerService.removePropertyTenent({ property: this.delete_data.property._id, tenent: this.delete_data.tenent._id }).subscribe(resp => {
      this.properties[this.delete_data.property_index] = resp['result']
      $('#deleteModal').modal('hide')
    }, err => {
      console.log(err)
      $('#deleteModal').modal('hide')
    })
  }

  updateDeleteModal(property, tenent, property_index) {
    this.delete_data.property = property
    this.delete_data.tenent = tenent
    this.delete_data.property_index = property_index
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
      this.temp_properties = resp['result']
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
