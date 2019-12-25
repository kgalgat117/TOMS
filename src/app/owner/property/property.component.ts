import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../owner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  properties: Array<object> = []
  propertiesParams: Object = {}

  constructor(private ownerService: OwnerService, private router: Router) {
    this.getProperties()
   }

   editProperty(property){
    this.router.navigate(['/dashboard/property/update'], {queryParams: {property: property._id}})
   }

  getProperties(){
    this.ownerService.getProperties(this.propertiesParams).subscribe(resp=>{
      console.log(resp)
      this.properties = resp['result']
    }, err=>{
      console.log(err)
    })
  }

  ngOnInit() {
  }

}
