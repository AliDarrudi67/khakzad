import {Component} from '@angular/core';
import {AdsService} from "../../core/services/ads.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  ads: any[] = []

  constructor(
    private adsService: AdsService
  ) {
    this.getAds()
  }

  getAds() {
    this.adsService.getAds().subscribe(
      (response) => {
        this.ads = response?.data
      }
    )
  }
}
