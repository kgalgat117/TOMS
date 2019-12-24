import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerComponent } from './owner.component';

const routes: Routes = [
    {
        path: '', component: OwnerComponent, children: [
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OwnerRoutingModule { }

export const OwnerRoutingComponents = [
    OwnerComponent
]