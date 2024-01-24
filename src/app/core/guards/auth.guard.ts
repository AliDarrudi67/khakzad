import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {MainService} from "../services/main.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private mainService: MainService,
              private router: Router) {
  }

  // @ts-ignore
  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if (token) {
        // const formData = new FormData()
        // formData.append('token', token)
        // this.mainService.get(ApiEndpoints.user.getUserById(token)).subscribe(
        //   (response) => {
        //     if (!response.result)
        //       this.navigateToLogin()
        //     return response.result
        //   }
        // )
        return true
      }
    } else {
      this.navigateToLogin()
    }
  }

  navigateToLogin() {
    window.location.href = '/auth/login'
  }
}
