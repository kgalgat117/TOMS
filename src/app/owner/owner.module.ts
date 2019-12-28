import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerRoutingModule, OwnerRoutingComponents } from './owner-routing.module';
import { SharedModule } from '../shared/shared.module';

import { MatDatepickerModule } from '@angular/material/datepicker'
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';

@NgModule({
  declarations: [
    OwnerRoutingComponents,
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    SharedModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatRippleModule
  ]
})
export class OwnerModule { }
