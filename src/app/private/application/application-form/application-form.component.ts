import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../../core/services/main.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiEndpoints} from "../../../core/config/apiEndpoints";

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent {
  form!: FormGroup
  formStatus = 'add'
  users:any[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private matDialogRef: MatDialogRef<ApplicationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data)
    this.formStatus = data?.id ? 'edit' : 'add'
    this.groupForm(data)
    this.getUsers()
  }

  groupForm(data: any) {
    this.form = this.formBuilder.group({
      en_app_name: [data?.en_app_name, Validators.required],
      per_app_name: [data?.per_app_name, Validators.required],
      package_name: [data?.package_name, Validators.required],
      telegram_channel: [data?.telegram_channel],
      youtube_channel: [data?.youtube_channel],
      privacy_url: [data?.privacy_url,Validators.required],
      google_play_url: [data?.google_play_url],
      ...(this.formStatus === 'add' && {
        user_id: [data?.user_id],
      })
    })
  }

  submitForm() {
    console.log(this.form.value)
    console.log(this.formStatus)
    if (this.form.valid) {
      if (this.formStatus == 'add') {
        this.mainService.post(ApiEndpoints.application.add, this.form.value).subscribe(
          (response) => {
            this.matDialogRef.close({result: true})
          }
        )
      } else {
        this.mainService.put(ApiEndpoints.application.edit(this.data?.id), this.form.value).subscribe(
          (response) => {
            this.matDialogRef.close({result: true})
          }
        )
      }
    }
  }

  getUsers() {
    this.mainService.get(ApiEndpoints.user.list).subscribe(
      (response)=>{
        this.users=response?.data
      }
    )
  }
}
