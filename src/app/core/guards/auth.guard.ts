import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {UserService} from "../services/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService,
              private router: Router) {
  }

  // @ts-ignore
  canActivate(): boolean {
    // this.navigateToLogin()
    // return false
    return true
  }

  navigateToLogin() {
    window.location.href = '/auth/login'
  }
}
