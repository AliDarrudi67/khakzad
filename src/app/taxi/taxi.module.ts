import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TaxiRoutingModule} from './taxi-routing.module';
import {HomeComponent} from './home/home.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {SharedModule} from "../core/shared/shared.module";
import {MatButtonModule} from "@angular/material/button";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS} from "../shared/material.persian-date.adapter";


@NgModule({
  declarations: [
    HomeComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    TaxiRoutingModule,
    MatButtonToggleModule,
    SharedModule,
    MatButtonModule
  ],
  providers: [
    {provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS}
  ]
})
export class TaxiModule {
}
