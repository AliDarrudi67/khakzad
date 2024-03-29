import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../../../core/services/main.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiEndpoints} from "../../../../core/config/apiEndpoints";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-server-group-form',
  templateUrl: './server-group-form.component.html',
  styleUrls: ['./server-group-form.component.scss']
})
export class ServerGroupFormComponent {
  form!: FormGroup
  formStatus = 'add'
  applications: any[] = []
  lang = localStorage.getItem('lang') ?? 'fa';
  direction: any = this.lang === 'fa' ? 'rtl' : 'ltr';


  constructor(
    private formBuilder: FormBuilder,
    public translate:TranslateService,
    public mainService: MainService,
    private toast: ToastrService,
    private matDialogRef: MatDialogRef<ServerGroupFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.groupForm(data)
    this.formStatus = data?.name ? 'edit' : 'add'
    console.log(this.data)
  }

  groupForm(data: any) {
    this.form = this.formBuilder.group({
      name: [data?.name, Validators.required],
      app_id: [data?.appId, Validators.required],
      is_active: [data?.is_active ? data?.is_active : true, Validators.required]
    })
  }

  submitForm() {
    console.log(this.form.value)
    if (this.form.valid) {
      if (this.formStatus == 'add') {
        this.mainService.post(ApiEndpoints.serverGroup.add(this.data?.appId), this.form.value).subscribe(
          (response) => {
            if (response.status === 200)
              this.matDialogRef.close({result: true})
            else
              this.toast.error(response?.message)
          }
        )
      } else {
        this.mainService.put(ApiEndpoints.serverGroup.edit(this.data?.appId, this.data?.id), this.form.value).subscribe(
          (response) => {
            if (response.status === 200)
              this.matDialogRef.close({result: true})
            else
              this.toast.error(response?.message)
          }
        )
      }
    }
  }
}
