import {Component, effect} from '@angular/core';
import {Router} from "@angular/router";
import {MainService} from "../../../core/services/main.service";
import {ApiEndpoints} from "../../../core/config/apiEndpoints";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  url = '';
  roles: any[] = []
  userName = '';

  constructor(
    private router: Router,
    public mainService: MainService
  ) {
    this.roles = this.mainService.roles()
    this.getCurrentUser()
    this.router.events.subscribe((event) => {
      this.url = location.pathname
    })
  }

  getCurrentUser() {
    this.mainService.get(ApiEndpoints.user.currentUser).subscribe(
      (response) => {
        this.mainService.userInfo.set(response?.data)
        this.mainService.roles.set(response?.data?.roles)
        this.roles = response?.data?.roles
        this.userName = response?.data?.firstName + ' ' + response?.data?.lastName
      }
    )
  }
}
