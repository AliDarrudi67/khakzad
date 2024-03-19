import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../../../../core/services/main.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiEndpoints} from "../../../../../core/config/apiEndpoints";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-ad-placement-form',
  templateUrl: './ad-placement-form.component.html',
  styleUrls: ['./ad-placement-form.component.scss']
})
export class AdPlacementFormComponent {
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
    private matDialogRef: MatDialogRef<AdPlacementFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formStatus = data?.item?.id ? 'edit' : 'add'
    console.log(this.data)
    this.groupForm(data)
  }

  groupForm(data: any) {
    this.form = this.formBuilder.group({
      unit_id: [data?.item?.unit_id, Validators.required],
      unit_type: [data?.item?.unit_type, Validators.required],
      interval_second: [data?.item?.interval_second, Validators.required],
      ad_network_id: [data?.networkId, Validators.required],
      is_active: [data?.item?.is_active ? data?.item?.is_active : true, Validators.required]
    })
    this.oldValues = {...this.form.value}
  }

  submitForm() {
    console.log(this.form.value)
    if (this.form.valid) {
      if (this.formStatus == 'add') {
        this.mainService.post(ApiEndpoints.adPlacement.add(this.data?.appId,this.data?.networkId), this.form.value).subscribe(
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

        this.mainService.put(ApiEndpoints.adPlacement.edit(this.data?.appId,this.data?.networkId, this.data?.item?.id), this.form.value).subscribe(
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
