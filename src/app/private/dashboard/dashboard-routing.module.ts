import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardContainerComponent} from "./dashboard-container/dashboard-container.component";

const routes: Routes = [
  {
    path:'',
    component:DashboardContainerComponent,
    children:[
      {
        path:'servers',
        loadChildren: () =>
          import('../server/server.module').then(m => m.ServerModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
