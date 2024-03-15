import {Component} from '@angular/core';
import {MainService} from "./core/services/main.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nova';

  constructor(
    private mainService: MainService,
    private router: Router
  ) {
    router.events.subscribe((val) => {
      if (window.innerWidth < 1024)
        this.mainService.showSidebar.set(false)
    });
  }
}
