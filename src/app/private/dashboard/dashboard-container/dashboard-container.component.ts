import {Component} from '@angular/core';
import * as moment from "jalali-moment";
import {MainService} from "../../../core/services/main.service";

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent {
  today = '';
  time = '';
  date: any

  constructor(
    private mainService:MainService
  ) {
    this.today = moment(new Date()).locale('fa').format('dddd YYYY/MM/DD');
    this.timeInterval()
  }

  timeInterval() {
    this.getTime()
    setInterval(
      () => {
        this.getTime()
      }, 60000
    )
  }

  getTime() {
    this.date = new Date();
    const hours = this.date.getHours();
    const minutes = this.date.getMinutes();
    this.time = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  logout() {
    this.mainService.logout()
  }
}
