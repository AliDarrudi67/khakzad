import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../../../core/services/main.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiEndpoints} from "../../../../core/config/apiEndpoints";

@Component({
  selector: 'app-network-form',
  templateUrl: './network-form.component.html',
  styleUrls: ['./network-form.component.scss']
})
export class NetworkFormComponent {
  form!: FormGroup
  formStatus = 'add'
  oldValues: any

  constructor(
    private formBuilder: FormBuilder,
    public mainService: MainService,
    private toast: ToastrService,
    private matDialogRef: MatDialogRef<NetworkFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.groupForm(data)
    this.formStatus = data?.item?.id ? 'edit' : 'add'
    console.log(this.data)
  }

  groupForm(data: any) {
    this.form = this.formBuilder.group({
      ad_network: [data?.item?.ad_network, Validators.required],
      ad_network_app_id: [data?.appId, Validators.required],
      is_active: [data?.item?.is_active ? data?.item?.is_active : true, Validators.required]
    })
    this.oldValues = {...this.form.value}
  }

  submitForm() {
    console.log(this.form.value)
    if (this.form.valid) {
      if (this.formStatus == 'add') {
        this.mainService.post(ApiEndpoints.network.add(this.data?.appId), this.form.value).subscribe(
          (response) => {
            if (response.status === 200)
              this.matDialogRef.close({result: true})
            else
              this.toast.error(response?.message)
          }
        )
      } else {
        const fields = this.mainService.compareForms(this.form.value, this.oldValues)
        const newData: any = {}
        fields.forEach(item => {
          newData[item] = this.form.get(item)?.value
        })

        this.mainService.put(ApiEndpoints.network.edit(this.data?.appId, this.data?.item?.id), newData).subscribe(
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
