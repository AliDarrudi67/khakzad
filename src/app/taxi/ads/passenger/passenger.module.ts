import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassengerRoutingModule } from './passenger-routing.module';
import { PassengerContainerComponent } from './passenger-container/passenger-container.component';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    PassengerContainerComponent
  ],
  imports: [
    CommonModule,
    PassengerRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule
  ]
})
export class PassengerModule { }
