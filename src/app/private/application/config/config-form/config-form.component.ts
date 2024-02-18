import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../../../core/services/main.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiEndpoints} from "../../../../core/config/apiEndpoints";

@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.scss']
})
export class ConfigFormComponent {
  form!: FormGroup
  formStatus = 'add'

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
  }

  groupForm(data: any) {
    this.form = this.formBuilder.group({
      ad_network: [data?.ad_network, Validators.required],
      ad_network_app_id: [data?.ad_network_app_id, Validators.required],
      is_active: [true, Validators.required]
    })
  }

  submitForm() {
    console.log(this.form.value)
    if (this.form.valid) {
      if (this.formStatus == 'add') {
        this.mainService.post(ApiEndpoints.config.add(this.data?.appId), this.form.value).subscribe(
          (response) => {
            if (response.status === 200)
              this.matDialogRef.close({result: true})
            else
              this.toast.error(response?.message)
          }
        )
      } else {
        this.mainService.put(ApiEndpoints.config.edit(this.data?.appId), this.form.value).subscribe(
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
