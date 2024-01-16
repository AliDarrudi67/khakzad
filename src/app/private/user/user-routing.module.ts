import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {
    path: 'changePassword',
    component: ChangePasswordComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
