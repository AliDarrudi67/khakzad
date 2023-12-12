import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdsContainerComponent} from "./ads-container/ads-container.component";

const routes: Routes = [
  {
    path: '', component: AdsContainerComponent,
    children: [
      {
        path: 'passenger', loadChildren: () =>
          import('./passenger/passenger.module').then(m => m.PassengerModule)
      },
      {
        path: 'driver', loadChildren: () =>
          import('./driver/driver.module').then(m => m.DriverModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdsRoutingModule {
}
