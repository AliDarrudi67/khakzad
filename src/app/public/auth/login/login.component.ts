import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../../core/services/main.service";
import {ApiEndpoints} from "../../../core/config/apiEndpoints";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup
  passwordType = 'password';
  lang = localStorage.getItem('lang') ?? 'fa';
  direction: any = this.lang === 'fa' ? 'rtl' : 'ltr';

  constructor(
    private formBuilder: FormBuilder,
    public mainService: MainService,
    public translate: TranslateService,
    private router: Router
  ) {
    this.groupForm()
  }

  groupForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  switchPasswordType(type: string) {
    this.passwordType = type === 'password' ? 'text' : 'password'
  }

  submitForm() {
    console.log(this.form.value)
    if (this.form.valid) {
      this.mainService.post(ApiEndpoints.user.userLogin, this.form.value).subscribe(
        (response) => {
          if (response?.status == 200) {
            this.mainService.roles.set(response?.data?.roles)
            localStorage.setItem('token', response?.data?.access_token)
            if (response?.data?.roles.includes('admin'))
              this.router.navigate(['/dashboard/applications']).then()
            else if (response?.data?.roles.includes('super_admin'))
              this.router.navigate(['/dashboard/users']).then()
          }
        }
      )
    }
  }

  changeLang(lang: string) {
    this.mainService.changeLang(lang)
  }
}
