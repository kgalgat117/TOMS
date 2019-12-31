import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../owner.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-tenent',
  templateUrl: './new-tenent.component.html',
  styleUrls: ['./new-tenent.component.css']
})
export class NewTenentComponent implements OnInit {

  tenent: any = {}
  tenentParams: any = {}

  constructor(private OwnerService: OwnerService, private router: Router, private activeRoute: ActivatedRoute) {
    this.activeRoute.queryParams.subscribe(params=>{
      if(params['tenent']){
        this.tenentParams.tenent = params['tenent']
        this.getTenent()
      }
    })
   }

   updateTenent(){
    this.OwnerService.updateTenent(this.tenent, this.tenentParams).subscribe(resp=>{
      this.router.navigate(['/dashboard/tenent'])
    }, err=>{
      console.log(err)
    })
  }

  getTenent(){
    this.OwnerService.getTenent(this.tenentParams).subscribe(resp=>{
      this.tenent = resp['result']
    }, err=>{
      console.log(err)
    })
  }

  ngOnInit() {
  }

  newTenent(){
    if(this.validateTenentData()){
      this.OwnerService.makeNewTenent(this.tenent, this.tenentParams).subscribe(resp=>{
        this.router.navigate(['/dashboard/tenent'])
      }, err=>{
        console.log(err)
      })
    }
  }

  validateTenentData(){
    if(this.tenent.name && this.tenent.meter_type && this.tenent.e_rate_per_unit && this.tenent.monthly_rent){
      return true
    }
    return false
  }

}
