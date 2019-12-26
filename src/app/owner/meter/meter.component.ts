import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../owner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meter',
  templateUrl: './meter.component.html',
  styleUrls: ['./meter.component.css']
})
export class MeterComponent implements OnInit {

  meters: Array<object> = []
  metersParams: Object = {}

 
  constructor(private ownerService: OwnerService, private router: Router) {
    this.getMeters()
   }

   editMeter(meter){
    this.router.navigate(['/dashboard/meter/update'], {queryParams: {meter: meter._id}})
   }

  getMeters(){
    this.ownerService.getMeters(this.metersParams).subscribe(resp=>{
      console.log(resp)
      this.meters = resp['result']
    }, err=>{
      console.log(err)
    })
  }
  ngOnInit() {
  }

}
