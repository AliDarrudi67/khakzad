import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DeviceContainerComponent} from "./device-container/device-container.component";

const routes: Routes = [
  {
    path: '',
    component: DeviceContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule {
}
