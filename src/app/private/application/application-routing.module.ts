import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApplicationContainerComponent} from "./application-container/application-container.component";

const routes: Routes = [
  {
    path: '',
    component: ApplicationContainerComponent
  },
  {
    path: 'setting/:id',
    loadChildren: () =>
      import('./application-setting/application-setting.module').then(m => m.ApplicationSettingModule)
  },
  {
    path: 'config/:id',
    loadChildren: () =>
      import('./config/config.module').then(m => m.ConfigModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule {
}
