import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardContainerComponent} from "./dashboard-container/dashboard-container.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardContainerComponent,
    children: [
      {
        path: 'servers',
        loadChildren: () =>
          import('../server/server.module').then(m => m.ServerModule)
      },
      {
        path: 'help',
        loadChildren: () =>
          import('../helps/helps.module').then(m => m.HelpsModule)
      },
      {
        path: 'applications',
        loadChildren: () =>
          import('../application/application.module').then(m => m.ApplicationModule)
      },
      {
        path: 'devices',
        loadChildren: () =>
          import('../device/device.module').then(m => m.DeviceModule)
      },
      {
        path: 'user',
        loadChildren: () =>
          import('../user/user.module').then(m => m.UserModule)
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../superAdmin/user/user.module').then(m => m.UserModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
