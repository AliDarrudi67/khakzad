import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HelpContainerComponent} from "./help-container/help-container.component";

const routes: Routes = [
  {
    path: '',
    component: HelpContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpsRoutingModule {
}
