import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerComponent } from './owner.component';
import { PropertyComponent } from './property/property.component';
import { NewPropertyComponent } from './property/new-property/new-property.component';

const routes: Routes = [
    { path: '', component: OwnerComponent, children: [
        {path: 'property', component: PropertyComponent },
        {path: 'property/new', component: NewPropertyComponent }
    ] },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OwnerRoutingModule { }

export const OwnerRoutingComponents = [
    OwnerComponent
]