import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiEndpoints} from "../../../core/config/apiEndpoints";
import {MainService} from "../../../core/services/main.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent {
  users: any[] = []
  filteredUsers: any[] = []
  form!: FormGroup
  showForm = false;
  lang = localStorage.getItem('lang') ?? 'fa';
  direction: any = this.lang === 'fa' ? 'rtl' : 'ltr';


  constructor(
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private mainService: MainService,
    private matDialogRef: MatDialogRef<ApplicationDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getUsers()
    this.groupForm()
    console.log(data)
  }

  getUsers() {
    this.mainService.get(ApiEndpoints.user.list).subscribe(
      (response) => {
        this.users = response?.data
        this.filteredUsers = response?.data
      })
  }

  groupForm() {
    this.form = this.formBuilder.group({
      user_id: ['', Validators.required]
    })
  }

  submitForm() {
    console.log(this.form.value)
    if (this.form.valid) {
      this.mainService.post(ApiEndpoints.admin.application.addUserToApp(this.data?.appId), this.form.value).subscribe(
        (response) => {
          this.matDialogRef.close({result: true})
        }
      )
    }
  }

  onKey($event: any) {
    const keyword = $event.target.value
    this.filteredUsers = this.users.filter(item => item?.first_name.indexOf(keyword) >= 0 || item?.last_name.indexOf(keyword) >= 0)
  }

  removeUser(userId: string) {
    this.mainService.delete(ApiEndpoints.application.removeUser(this.data?.appId, userId)).subscribe(
      (response) => {
        this.mainService.get(ApiEndpoints.application.users(this.data?.appId)).subscribe(
          (response) => {
            this.data.users = response?.data
          }
        )
      }
    )
  }

  focusSearch() {
    setTimeout(
      () => {
        let element: HTMLElement = document.getElementById('search') as HTMLElement;
        element.focus();
      }, 500
    )
  }
}
