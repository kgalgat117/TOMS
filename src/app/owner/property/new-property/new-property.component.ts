import { Component, OnInit } from '@angular/core';
// import { PropertyInterface } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-new-property',
  templateUrl: './new-property.component.html',
  styleUrls: ['./new-property.component.css']
})
export class NewPropertyComponent implements OnInit {

  property: PropertyInterface = {
    name: '',
    address1: '',
    address2: '',
    state: '',
    city: '',
    country: '',
    pincode: ''
  }

  constructor() { }

  ngOnInit() {
  }

  newProperty(){
    if(this.validatePropertyData()){
      console.log(this.property)
    }
  }

  validatePropertyData(){
    if(this.property.name && this.property.address1 && this.property.address2 && this.property.city && this.property.state && this.property.country && this.property.pincode){
      return true
    }
    return false
  }

}

interface PropertyInterface {
  name: string,
  address1: string,
  address2: string,
  country: string,
  state: string,
  city: string,
  pincode: string
}
