import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../../core/services/main.service";
import {ApiEndpoints} from "../../../core/config/apiEndpoints";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private router:Router
  ) {
    this.groupForm()
  }

  groupForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  submitForm() {
    console.log(this.form.value)
    if (this.form.valid) {
      this.mainService.post(ApiEndpoints.user.userLogin, this.form.value).subscribe(
        (response) => {
          if (response?.status == 200) {
            localStorage.setItem('token', response?.data?.access_token)
            this.router.navigate(['/dashboard']).then()
          }
        }
      )
    }
  }
}
