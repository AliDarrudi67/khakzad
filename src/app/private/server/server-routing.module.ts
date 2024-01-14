import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServerListComponent} from "./server-list/server-list.component";
import {ServerProfilesComponent} from "./server-profiles/server-profiles.component";

const routes: Routes = [
  {
    path: '',
    component: ServerListComponent
  },
  {
    path: 'profiles/:id',
    component: ServerProfilesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServerRoutingModule {
}
