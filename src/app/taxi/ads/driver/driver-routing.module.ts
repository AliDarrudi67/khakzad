import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DriverContainerComponent} from "./driver-container/driver-container.component";

const routes: Routes = [
  {path: '', component: DriverContainerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule {
}
