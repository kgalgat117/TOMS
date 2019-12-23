import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerRoutingModule, OwnerRoutingComponents } from './owner-routing.module';
import { SharedModule } from '../shared/shared.module';
// import { JobFormComponent } from './job-form/job-form.component';


@NgModule({
  declarations: [
    OwnerRoutingComponents,
    // JobFormComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    SharedModule
  ]
})
export class RecruiterModule { }
