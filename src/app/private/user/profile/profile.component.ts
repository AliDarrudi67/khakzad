import {Component, effect} from '@angular/core';
import {MainService} from "../../../core/services/main.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiEndpoints} from "../../../core/config/apiEndpoints";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userInfo: any
  form!: FormGroup

  constructor(
    private mainService: MainService,
    private formBuilder: FormBuilder
  ) {
    this.groupForm()
  }

  onGetUserInfo = effect(() => {
    if (this.mainService.userInfo()) {
      this.userInfo = this.mainService.userInfo()
      this.groupForm()
    }
  })

  groupForm() {
    this.form = this.formBuilder.group({
      firstName: [this.userInfo?.firstName, Validators.required],
      lastName: [this.userInfo?.lastName, Validators.required]
    })
  }

  submitForm() {
    console.log(this.form.value)
    if (this.form.valid) {
      this.mainService.put(ApiEndpoints.user.editProfile, this.form.value).subscribe(
        (response) => {

        }
      )
    }
  }
}
