import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdPlacementContainerComponent} from "./ad-placement-container/ad-placement-container.component";

const routes: Routes = [
  {
    path: '',
    component: AdPlacementContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdPlacementRoutingModule {
}
