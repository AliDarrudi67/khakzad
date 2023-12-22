import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'jalali-moment';
import {AdsService} from "../../../../core/services/ads.service";
import {ToastrService} from "ngx-toastr";
import {SharedService} from "../../../../core/services/shared.service";

@Component({
  selector: 'app-passenger-container',
  templateUrl: './passenger-container.component.html',
  styleUrls: ['./passenger-container.component.scss']
})
export class PassengerContainerComponent {
  form!: FormGroup
  date = '';

  constructor(
    private formBuilder: FormBuilder,
    private adsService: AdsService,
    private toast: ToastrService,
    private sharedService: SharedService
  ) {
    this.groupForm()
  }

  groupForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['passenger', Validators.required],
      date: ['', Validators.required],
      hour: ['', Validators.required],
      minute: ['', Validators.required],
      startTime: [''],
      passengerCount: ['', Validators.required],
      source: ['', Validators.required],
      destination: ['', Validators.required],
      mobile: ['', Validators.required]
    })
  }

  onDateChanged($event: any) {
    console.log($event);
    this.date = moment.from($event, 'fa').format('YYYY/MM/DD')
  }

  submitForm() {
    console.log(this.form.value);
    const data = this.form
    data.patchValue({
      startTime: this.date + ' ' + this.form.get('hour')?.value + ':' + this.form.get('minute')?.value
    })
    console.log(data);

    if (this.form.valid) {
      this.adsService.post('ads/add', this.sharedService.getFormData(data)).subscribe(
        (response) => {
          if (response?.result)
            this.toast.success('اگهی شما با موفقیت ثبت شد. بعد از تایید مدیر نمایش خواهد یافت.')
        }
      )
    }
  }
}
