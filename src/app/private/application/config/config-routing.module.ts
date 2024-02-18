import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConfigContainerComponent} from "./config-container/config-container.component";

const routes: Routes = [
  {
    path: '',
    component: ConfigContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule {
}
