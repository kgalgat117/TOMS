import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerRoutingModule, OwnerRoutingComponents } from './owner-routing.module';
import { SharedModule } from '../shared/shared.module';

import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';

import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [
    OwnerRoutingComponents
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    SharedModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatRippleModule,
    GoogleChartsModule
  ]
})
export class OwnerModule { }
