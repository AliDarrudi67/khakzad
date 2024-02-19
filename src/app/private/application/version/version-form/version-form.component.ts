import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../../../core/services/main.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiEndpoints} from "../../../../core/config/apiEndpoints";

@Component({
  selector: 'app-version-form',
  templateUrl: './version-form.component.html',
  styleUrls: ['./version-form.component.scss']
})
export class VersionFormComponent {
  form!: FormGroup
  formStatus = 'add'

  constructor(
    private formBuilder: FormBuilder,
    public mainService: MainService,
    private toast: ToastrService,
    private matDialogRef: MatDialogRef<VersionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.groupForm(data)
    this.formStatus = data?.name ? 'edit' : 'add'
    console.log(this.data)
  }

  groupForm(data: any) {
    this.form = this.formBuilder.group({
      version_code: [data?.version_code, Validators.required],
      version_name: [data?.version_name, Validators.required],
      is_force_update: [data?.is_force_update?data?.is_force_update:true, Validators.required],
      is_initial_version: [data?.is_initial_version ? data?.is_initial_version : true, Validators.required],
      download_url: [data?.download_url , Validators.required],
      is_play_store_download: [data?.is_play_store_download ? data?.is_play_store_download : true, Validators.required],
      is_active: [data?.is_active ? data?.is_active : true, Validators.required]
    })
  }

  submitForm() {
    console.log(this.form.value)
    if (this.form.valid) {
      if (this.formStatus == 'add') {
        this.mainService.post(ApiEndpoints.version.add(this.data?.appId), this.form.value).subscribe(
          (response) => {
            if (response.status === 200)
              this.matDialogRef.close({result: true})
            else
              this.toast.error(response?.message)
          }
        )
      }
        // else {
      //   this.mainService.put(ApiEndpoints.serverGroup.edit(this.data?.appId), this.form.value).subscribe(
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
