import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ApplicationContainerComponent} from "./application-container/application-container.component";
import {ServerProfilesComponent} from "../server/server-profiles/server-profiles.component";

const routes: Routes = [
  {
    path:'',
    component:ApplicationContainerComponent
  },
  {
    path: 'setting/:id',
    loadChildren: () =>
      import('./application-setting/application-setting.module').then(m => m.ApplicationSettingModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
