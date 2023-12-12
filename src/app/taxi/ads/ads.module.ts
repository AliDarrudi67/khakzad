import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdsRoutingModule } from './ads-routing.module';
import { AdsContainerComponent } from './ads-container/ads-container.component';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    AdsContainerComponent
  ],
  imports: [
    CommonModule,
    AdsRoutingModule,
    MatButtonModule
  ]
})
export class AdsModule { }
