import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../../../core/services/main.service";
import {ApiEndpoints} from "../../../../core/config/apiEndpoints";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  form!: FormGroup
  formStatus = 'add'
  passwordType = 'password';

  constructor(
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private matDialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.groupForm(data)
    this.formStatus = data?.username ? 'edit' : 'add'
  }

  groupForm(data: any) {
    this.form = this.formBuilder.group({
      username: [data?.username, Validators.required],
      email: [data?.email, [Validators.required, Validators.email]],
      first_name: [data?.first_name, Validators.required],
      last_name: [data?.last_name, Validators.required],
      roles: [data?.roles, Validators.required],
      ...(this.formStatus === 'add' && {
        password: [data?.password, Validators.required]
      })
    })
  }

  submitForm() {
    console.log(this.form.value)
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

}
