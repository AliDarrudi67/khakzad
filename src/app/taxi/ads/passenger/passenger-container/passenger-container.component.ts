import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-passenger-container',
  templateUrl: './passenger-container.component.html',
  styleUrls: ['./passenger-container.component.scss']
})
export class PassengerContainerComponent {
  form!: FormGroup
  date = '';

  constructor(
    private formBuilder: FormBuilder
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
    const data = this.form.value
    data.startTime = this.date + ' ' + this.form.get('hour')?.value + ':' + this.form.get('minute')?.value
    console.log(data);

  }
}
