import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingComponents, CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RoutingComponents],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule
  ],
  exports: [
    CoreRoutingModule,
    RoutingComponents
  ]
})
export class CoreModule { }
