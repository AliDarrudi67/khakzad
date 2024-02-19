import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VersionContainerComponent} from "./version-container/version-container.component";

const routes: Routes = [
  {
    path: '',
    component: VersionContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VersionRoutingModule {
}
