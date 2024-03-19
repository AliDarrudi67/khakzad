import {Component, Renderer2} from '@angular/core';
import {MainService} from "./core/services/main.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nova';

  constructor(
    private mainService: MainService,
    private router: Router,
    private renderer: Renderer2,
    private translate: TranslateService
  ) {
    router.events.subscribe((val) => {
      if (window.innerWidth < 1024)
        this.mainService.showSidebar.set(false)
    });
    const lang = localStorage.getItem('lang') ? localStorage.getItem('lang')! : 'fa'
    translate.setDefaultLang(lang);
    translate.use(lang);
    renderer.addClass(document.body, lang);
    renderer.addClass(document.body, lang === 'fa' ? 'rtlBody' : 'ltrBody');
  }
}
