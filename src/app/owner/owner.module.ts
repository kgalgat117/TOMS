import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerRoutingModule, OwnerRoutingComponents } from './owner-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PropertyComponent } from './property/property.component';
import { NewPropertyComponent } from './property/new-property/new-property.component';


@NgModule({
  declarations: [
    OwnerRoutingComponents,
    PropertyComponent,
    NewPropertyComponent,
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    SharedModule
  ]
})
export class OwnerModule { }
