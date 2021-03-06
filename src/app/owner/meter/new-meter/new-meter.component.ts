import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../owner.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-meter',
  templateUrl: './new-meter.component.html',
  styleUrls: ['./new-meter.component.css']
})
export class NewMeterComponent implements OnInit {

  meter: any = {}
  meterParams: any = {}

  properties: Array<object> = []
  propertiesParams: Object = {}

  constructor(private OwnerService: OwnerService, private router: Router, private activeRoute: ActivatedRoute) {
    this.activeRoute.queryParams.subscribe(params=>{
      if(params['meter']){
        this.meterParams.meter = params['meter']
        this.getMeter()
      }
    })
    this.getProperties()
   }

   getProperties(){
    this.OwnerService.getProperties(this.propertiesParams).subscribe(resp=>{
      console.log(resp)
      this.properties = resp['result']
    }, err=>{
      console.log(err)
    })
  }

   updateMeter(){
    this.OwnerService.updateMeter(this.meter, this.meterParams).subscribe(resp=>{
      this.router.navigate(['/dashboard/meter'])
    }, err=>{
      console.log(err)
    })
  }

  getMeter(){
    this.OwnerService.getMeter(this.meterParams).subscribe(resp=>{
      this.meter = resp['result']
    }, err=>{
      console.log(err)
    })
  }

  ngOnInit() {
  }

  newMeter(){
    if(this.validateMeterData()){
      this.OwnerService.makeNewMeter(this.meter, this.meterParams).subscribe(resp=>{
        this.router.navigate(['/dashboard/meter'])
      }, err=>{
        console.log(err)
      })
    }
  }

  validateMeterData(){
    if(this.meter.name && this.meter.meter_type && this.meter.rate_per_unit && this.meter.property){
      return true
    }
    return false
  }

}
