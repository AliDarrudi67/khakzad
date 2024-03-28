import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../../../core/services/main.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiEndpoints} from "../../../../core/config/apiEndpoints";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-version-form',
  templateUrl: './version-form.component.html',
  styleUrls: ['./version-form.component.scss']
})
export class VersionFormComponent {
  form!: FormGroup
  formStatus = 'add'
  oldValues: any
  lang = localStorage.getItem('lang') ?? 'fa';
  direction: any = this.lang === 'fa' ? 'rtl' : 'ltr';


  constructor(
    private formBuilder: FormBuilder,
    public mainService: MainService,
    public translate:TranslateService,
    private toast: ToastrService,
    private matDialogRef: MatDialogRef<VersionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.groupForm(data)
    this.formStatus = data?.item?.id ? 'edit' : 'add'
    console.log(this.data)
  }

  groupForm(data: any) {
    this.form = this.formBuilder.group({
      version_code: [data?.item?.version_code, Validators.required],
      version_name: [data?.item?.version_name, Validators.required],
      is_force_update: [data?.item?.is_force_update ? data?.item?.is_force_update : true, Validators.required],
      is_initial_version: [data?.item?.is_initial_version ? data?.item?.is_initial_version : true, Validators.required],
      download_url: [data?.item?.download_url, [Validators.required,Validators.pattern('https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)')]],
      is_play_store_download: [data?.item?.is_play_store_download ? data?.item?.is_play_store_download : true, Validators.required],
      is_active: [data?.item?.is_active ? data?.item?.is_active : true, Validators.required]
    })
    this.oldValues = {...this.form.value}
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
      } else {
        console.log(this.form.value)
        console.log(this.oldValues)
        const fields = this.mainService.compareForms(this.form.value, this.oldValues)
        const newData: any = {}
        fields.forEach(item => {
          newData[item] = this.form.get(item)?.value
        })

        this.mainService.put(ApiEndpoints.version.edit(this.data?.appId, this.data?.item?.id), newData).subscribe(
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
