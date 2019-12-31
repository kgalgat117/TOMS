import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../owner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenent',
  templateUrl: './tenent.component.html',
  styleUrls: ['./tenent.component.css']
})
export class TenentComponent implements OnInit {

  tenents: Array<object> = []
  tenentsParams: Object = {}

  new_payment: any = {}
  new_reading: any = {}
 
  constructor(private ownerService: OwnerService, private router: Router) {
    this.getTenents()
   }

   updateTenent(tenent){
      this.new_payment.tenent = tenent._id
      this.new_reading.tenent = tenent._id
   }

   rentPaid(){
     this.ownerService.tenentPaid(this.new_payment).subscribe(resp=>{
       console.log(resp)
       this.new_payment.amount = null,
       this.new_payment.paid_on = null
     }, err=>{
       console.log(err)
     })
   }

   newReading(){
    this.ownerService.tenentPaid(this.new_reading).subscribe(resp=>{
      console.log(resp)
      this.new_payment.reading = null,
       this.new_payment.taken_on = null
    }, err=>{
      console.log(err)
    })
   }

   editTenent(tenent){
    this.router.navigate(['/dashboard/tenent/update'], {queryParams: {tenent: tenent._id}})
   }

  getTenents(){
    this.ownerService.getTenents(this.tenentsParams).subscribe(resp=>{
      console.log(resp)
      this.tenents = resp['result']
    }, err=>{
      console.log(err)
    })
  }
  

  ngOnInit() {
  }

}
