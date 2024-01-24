import {Pipe, PipeTransform} from '@angular/core';
import * as moment from "jalali-moment";

@Pipe({
  name: 'persianDate'
})
export class PersianDatePipe implements PipeTransform {

  transform(value: string | Date, type: any = ''): unknown {
    if (value) {
      return moment(new Date(value)).format(type === 'date' ? 'jYYYY-jMM-jDD ' : type === 'justTime' ? 'HH:mm' : 'HH:mm jYYYY-jMM-jDD ')
    }
    return ''
  }

}
