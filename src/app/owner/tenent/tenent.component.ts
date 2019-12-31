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

 
  constructor(private ownerService: OwnerService, private router: Router) {
    this.getTenents()
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
