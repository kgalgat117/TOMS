import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../owner.service';
import { Router } from '@angular/router';

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
  propertyParams: Object = {

  }

  constructor(private OwnerService: OwnerService, private router: Router) { }

  ngOnInit() {
  }

  newProperty(){
    if(this.validatePropertyData()){
      this.OwnerService.makeNewProperty(this.property, this.propertyParams).subscribe(resp=>{
        this.router.navigate(['/dashboard/property'])
      }, err=>{
        console.log(err)
      })
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
