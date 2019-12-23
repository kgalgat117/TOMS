import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { DashboardComponent } from './dashboard/list.component';
import { OwnerComponent } from './owner.component';
// import { JobFormComponent } from './job-form/job-form.component';

const routes: Routes = [
    {
        path: '', component: OwnerComponent, children: [
            // { path: '', pathMatch: 'full', redirectTo: '/dashboard/list' },
            // { path: 'list', component: DashboardComponent },
            // { path: 'new-job', component: JobFormComponent },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OwnerRoutingModule { }

export const OwnerRoutingComponents = [
    // DashboardComponent,
    OwnerComponent
]