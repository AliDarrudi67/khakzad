import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../../../core/services/main.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiEndpoints} from "../../../../core/config/apiEndpoints";

@Component({
  selector: 'app-server-form',
  templateUrl: './server-form.component.html',
  styleUrls: ['./server-form.component.scss']
})
export class ServerFormComponent {
  form!: FormGroup
  formStatus = 'add'

  constructor(
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private toast: ToastrService,
    private matDialogRef: MatDialogRef<ServerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.groupForm(data)
    this.formStatus = data?.name ? 'edit' : 'add'
    console.log(this.data)
  }

  groupForm(data: any) {
    this.form = this.formBuilder.group({
      server_group_id: [data?.name, Validators.required],
      country_code: [data?.app_id, Validators.required],
      remarks: [data?.country_code, Validators.required],
      server_uri: [data?.server_uri, Validators.required]
    })
  }

  submitForm() {
    console.log(this.form.value)
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
        // this.mainService.put(ApiEndpoints.server.edit(this.data?.appId), this.form.value).subscribe(
        //   (response) => {
        //     if (response.status === 200)
        //       this.matDialogRef.close({result: true})
        //     else
        //       this.toast.error(response?.message)
        //   }
        // )
      }
    }
  }
}
