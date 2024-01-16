import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  ApplicationSettingContainerComponent
} from "./application-setting-container/application-setting-container.component";

const routes: Routes = [
  {
    path: '',
    component: ApplicationSettingContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationSettingRoutingModule {
}
