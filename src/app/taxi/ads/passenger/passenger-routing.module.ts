import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PassengerContainerComponent} from "./passenger-container/passenger-container.component";

const routes: Routes = [
  {path: '', component: PassengerContainerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassengerRoutingModule {
}
