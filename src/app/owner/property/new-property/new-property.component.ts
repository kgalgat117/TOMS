import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../owner.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-property',
  templateUrl: './new-property.component.html',
  styleUrls: ['./new-property.component.css']
})
export class NewPropertyComponent implements OnInit {

  property: any = {
    name: '',
    category: '',
  }
  propertyParams: any = {

  }

  constructor(private OwnerService: OwnerService, private router: Router, private activeRoute: ActivatedRoute) { 
    this.activeRoute.queryParams.subscribe(params=>{
      if(params['property']){
        this.propertyParams.property = params['property']
        this.getProperty()
      }
    })
  }

  updateProperty(){
    this.OwnerService.updateProperty(this.property, this.propertyParams).subscribe(resp=>{
      this.router.navigate(['/dashboard/property'])
    }, err=>{
      console.log(err)
    })
  }

  getProperty(){
    this.OwnerService.getProperty(this.propertyParams).subscribe(resp=>{
      this.property = resp['result']
    }, err=>{
      console.log(err)
    })
  }

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
    if(this.property.name && this.property.category){
      return true
    }
    return false
  }

}

