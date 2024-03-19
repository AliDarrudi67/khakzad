import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-application-setting-container',
  templateUrl: './application-setting-container.component.html',
  styleUrls: ['./application-setting-container.component.scss']
})
export class ApplicationSettingContainerComponent {
  lang = localStorage.getItem('lang') ?? 'fa';
  direction: any = this.lang === 'fa' ? 'rtl' : 'ltr';

constructor(
  public translate:TranslateService,
) {
}
}
