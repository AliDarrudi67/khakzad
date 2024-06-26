import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../../../core/services/main.service";
import {ApiEndpoints} from "../../../../core/config/apiEndpoints";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  form!: FormGroup
  formStatus = 'add'
  passwordType = 'password';
  lang = localStorage.getItem('lang') ?? 'fa';
  direction: any = this.lang === 'fa' ? 'rtl' : 'ltr';


  constructor(
    private formBuilder: FormBuilder,
    private mainService: MainService,
    public translate:TranslateService,
    private matDialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data)
    this.formStatus = data?.formStatus
    this.groupForm(data)
  }

  groupForm(data: any) {
    this.form = this.formBuilder.group({
      first_name: [data?.first_name, Validators.required],
      last_name: [data?.last_name, Validators.required],
      roles: [data?.roles, Validators.required],
      ...(this.formStatus === 'add' && {
        password: [data?.password, Validators.required],
        username: [data?.username, Validators.required],
        email: [data?.email, [Validators.required, Validators.email]],
      })
    })
  }

  submitForm() {
    console.log(this.form.value)
    this.mainService.getFormValidationErrors(this.form)
    if (this.form.valid) {
      if (this.formStatus == 'add') {
        this.mainService.post(ApiEndpoints.user.add, this.form.value).subscribe(
          (response) => {
            this.matDialogRef.close({result: true})
          }
        )
      } else {
        this.mainService.put(ApiEndpoints.user.edit(this.data?.id), this.form.value).subscribe(
          (response) => {
            this.matDialogRef.close({result: true})
          }
        )
      }
    }
  }

  switchPasswordType(type: string) {
    this.passwordType = type === 'password' ? 'text' : 'password'
  }

  onKeyUp(event: any) {
    const input = event.target.value;
    const regex = /^[a-zA-Z0-9_.]*$/;
    if (!regex.test(input)) {
      // اگر ورودی با الگوی مشخص شده مطابقت نداشته باشد، از ورودی غیرمجاز جلوگیری کنید
      event.target.value = input.replace(/[^a-zA-Z0-9_.]/g, '');
    }
  }

  onKeyUpEmail(event: any) {
    const input = event.target.value;
    const regex = /^[a-zA-Z0-9_.@]*$/;
    if (!regex.test(input)) {
      // اگر ورودی با الگوی مشخص شده مطابقت نداشته باشد، از ورودی غیرمجاز جلوگیری کنید
      event.target.value = input.replace(/[^a-zA-Z0-9_.@]/g, '');
    }
  }
}
