import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../owner.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  properties: Array<object> = []
  propertiesParams: Object = {}

  constructor(private ownerService: OwnerService) {
    this.getProperties()
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
