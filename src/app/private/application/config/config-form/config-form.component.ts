import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../../../core/services/main.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiEndpoints} from "../../../../core/config/apiEndpoints";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.scss']
})
export class ConfigFormComponent {
  form!: FormGroup
  formStatus = 'add'
  versions:any[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private toast: ToastrService,
    private matDialogRef: MatDialogRef<ConfigFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.groupForm(data)
    this.formStatus = data?.ad_network ? 'edit' : 'add'
    console.log(this.data)
    this.getVersions()
    this.formStatus=this.data?.formMode
  }

  getVersions() {
    this.mainService.get(ApiEndpoints.version.list(this.data?.appId)).subscribe(
      (response) => {
        this.versions = response?.data
      })
  }

  groupForm(data: any) {
    this.form = this.formBuilder.group({
      disconnect_delay_seconds: [data?.disconnect_delay_seconds, Validators.required],
      connect_delay_seconds: [data?.connect_delay_seconds, Validators.required],
      is_ads_enabled: [data?.is_ads_enabled, Validators.required],
      latest_app_version_id: [data?.latest_app_version?.id, Validators.required],
      disable_old_versions: [data?.disable_old_versions, Validators.required],
      is_force_update_enabled: [data?.is_force_update_enabled, Validators.required],
      encrypt_configs: [data?.encrypt_configs, Validators.required]
    })
  }

  submitForm() {
    console.log(this.form.value)
    if (this.form.valid) {
      this.form.patchValue({
        disconnect_delay_seconds:+this.form.get('disconnect_delay_seconds')?.value,
        connect_delay_seconds:+this.form.get('connect_delay_seconds')?.value,
      })

      this.mainService.post(ApiEndpoints.config.edit(this.data?.appId), this.form.value).subscribe(
        (response) => {
          if (response.status === 200)
            this.matDialogRef.close({result: true})
          else
            this.toast.error(response?.message)
        }
      )

      // if (this.formStatus == 'add') {
      //   this.mainService.post(ApiEndpoints.config.edit(this.data?.appId), this.form.value).subscribe(
      //     (response) => {
      //       if (response.status === 200)
      //         this.matDialogRef.close({result: true})
      //       else
      //         this.toast.error(response?.message)
      //     }
      //   )
      // }
      // else {
      //   this.mainService.put(ApiEndpoints.config.edit(this.data?.appId), this.form.value).subscribe(
      //     (response) => {
      //       if (response.status === 200)
      //         this.matDialogRef.close({result: true})
      //       else
      //         this.toast.error(response?.message)
      //     }
      //   )
      // }
    }
  }
}
