import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../../../core/services/main.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiEndpoints} from "../../../../core/config/apiEndpoints";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-server-form',
  templateUrl: './server-form.component.html',
  styleUrls: ['./server-form.component.scss']
})
export class ServerFormComponent {
  form!: FormGroup
  formStatus = 'add'
  serverGroups: any[] = []
  lang = localStorage.getItem('lang') ?? 'fa';
  direction: any = this.lang === 'fa' ? 'rtl' : 'ltr';


  constructor(
    private formBuilder: FormBuilder,
    public translate:TranslateService,
    public mainService: MainService,
    private toast: ToastrService,
    private matDialogRef: MatDialogRef<ServerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formStatus = data?.id ? 'edit' : 'add'
    this.groupForm(data)
    this.getServerGroups()
    console.log(this.data)
  }

  groupForm(data: any) {
    this.form = this.formBuilder.group({
      country_code: [data?.country_code, Validators.required],
      remarks: [data?.remarks, Validators.required],
      server_uri: [data?.server_uri, Validators.required],
      address: [data?.address],
      port: [data?.port],
      mnc: [data?.mnc],
      asn: [data?.asn],
      is_active: [this.formStatus === 'add' ? true : data?.is_active],
      custom_json: [data?.custom_json],
      ...(this.formStatus === 'add' && {
        server_group_id: [data?.name, Validators.required],
      })
    })
  }

  submitForm() {
    console.log(this.form.value)
    this.mainService.getFormValidationErrors(this.form)
    console.log(this.form.valid)
    if (this.form.valid) {
      if (this.formStatus == 'add') {
        this.mainService.post(ApiEndpoints.server.add(this.data?.appId), this.form.value).subscribe(
          (response) => {
            if (response.status === 200)
              this.matDialogRef.close({result: true})
            else
              this.toast.error(response?.message)
          }
        )
      } else {
        this.mainService.put(ApiEndpoints.server.edit(this.data?.appId, this.data?.id), this.form.value).subscribe(
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

  getServerGroups() {
    this.mainService.get(ApiEndpoints.serverGroup.list(this.data?.appId)).subscribe(
      (response) => {
        this.serverGroups = response?.data
      })
  }
}
