import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../../core/services/main.service";
import {ApiEndpoints} from "../../../core/config/apiEndpoints";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  currentPassword = 'password';
  passwordType = 'password';
  confirmPasswordType = 'password';
  form!: FormGroup
  lang = localStorage.getItem('lang') ?? 'fa';
  direction: any = this.lang === 'fa' ? 'rtl' : 'ltr';

  constructor(
    public translate:TranslateService,
    private formBuilder: FormBuilder,
    private toast:ToastrService,
    private mainService: MainService
  ) {
    this.groupForm()
  }

  switchPasswordType(type: string) {
    this.passwordType = type === 'password' ? 'text' : 'password'
  }

  switchConfirmPasswordType(type: string) {
    this.confirmPasswordType = type === 'password' ? 'text' : 'password'
  }

  switchCurrentPassword(type: string) {
    this.currentPassword = type === 'password' ? 'text' : 'password'
  }

  groupForm() {
    this.form = this.formBuilder.group({
      current_password: ['', Validators.required],
      new_password: ['', Validators.required],
      confirm_new_password: ['', Validators.required]
    })
  }

  submitForm() {
    console.log(this.form.value)
    if (this.form.valid) {
      if(this.formValidate()){
      this.mainService.post(ApiEndpoints.user.changePassword, this.form.value).subscribe(
        (response) => {

        }
      )
    }
    }
  }

  formValidate() {
    const current_password=this.form.get('current_password')?.value
    const new_password=this.form.get('new_password')?.value
    const confirm_new_password=this.form.get('confirm_new_password')?.value

    if(current_password?.length<8 || new_password?.length<8 || confirm_new_password?.length<8){
      this.toast.error(this.translate.instant('atLeast8Fields'))
      return false
    }else if(new_password!==confirm_new_password){
      this.toast.error(this.translate.instant('passwordAndConfirmationInNotEqual'))
      return false
    }
    return true
  }
}
