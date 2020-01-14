import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerComponent } from './owner.component';
import { PropertyComponent } from './property/property.component';
import { NewPropertyComponent } from './property/new-property/new-property.component';
import { MeterComponent } from './meter/meter.component';
import { NewMeterComponent } from './meter/new-meter/new-meter.component';
import { TenentComponent } from './tenent/tenent.component';
import { NewTenentComponent } from './tenent/new-tenent/new-tenent.component';


const routes: Routes = [
    { path: '', component: OwnerComponent, children: [
        {path: 'property', component: PropertyComponent },
        {path: 'property/new', component: NewPropertyComponent },
        {path: 'property/update', component: NewPropertyComponent },
        // {path: 'meter', component: MeterComponent },
        // {path: 'meter/new', component: NewMeterComponent },
        // {path: 'meter/update', component: NewMeterComponent },
        {path: 'tenent', component: TenentComponent },
        {path: 'tenent/new', component: NewTenentComponent },
        {path: 'tenent/update', component: NewTenentComponent },
    ] },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OwnerRoutingModule { }

export const OwnerRoutingComponents = [
    OwnerComponent,
    PropertyComponent,
    NewPropertyComponent,
    // MeterComponent,
    // NewMeterComponent,
    TenentComponent,
    NewTenentComponent
]