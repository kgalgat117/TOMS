import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerComponent } from './owner.component';
import { PropertyComponent } from './property/property.component';
import { NewPropertyComponent } from './property/new-property/new-property.component';
import { MeterComponent } from './meter/meter.component';
import { NewMeterComponent } from './meter/new-meter/new-meter.component';
import { TenentComponent } from './tenent/tenent.component';
import { NewTenentComponent } from './tenent/new-tenent/new-tenent.component';
import { PaymentComponent } from './payment/payment.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
    {
        path: '', component: OwnerComponent, children: [
            { path: '', pathMatch: 'full', redirectTo: 'home' },
            { path: 'home', component: DashboardComponent },
            { path: 'property', component: PropertyComponent },
            { path: 'property/new', component: NewPropertyComponent },
            { path: 'property/update', component: NewPropertyComponent },
            {path: 'meter', component: MeterComponent },
            {path: 'meter/new', component: NewMeterComponent },
            {path: 'meter/update', component: NewMeterComponent },
            { path: 'payment', component: PaymentComponent },
            { path: 'tenent', component: TenentComponent },
            { path: 'tenent/new', component: NewTenentComponent },
            { path: 'tenent/update', component: NewTenentComponent },
        ]
    },
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
    PaymentComponent,
    MeterComponent,
    NewMeterComponent,
    TenentComponent,
    NewTenentComponent,
    DashboardComponent
]