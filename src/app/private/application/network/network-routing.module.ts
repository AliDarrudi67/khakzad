import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NetworkContainerComponent} from "./network-container/network-container.component";

const routes: Routes = [
  {
    path: '',
    component: NetworkContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkRoutingModule {
}
