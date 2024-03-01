import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NetworkContainerComponent} from "./network-container/network-container.component";

const routes: Routes = [
  {
    path: '',
    component: NetworkContainerComponent
  },
  {
    path:'ad-placement/:networkId',
    loadChildren: () =>
      import('./ad-placement/ad-placement.module').then(m => m.AdPlacementModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkRoutingModule {
}
