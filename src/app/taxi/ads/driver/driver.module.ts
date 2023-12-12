import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverRoutingModule } from './driver-routing.module';
import { DriverContainerComponent } from './driver-container/driver-container.component';
import {BidiModule} from "@angular/cdk/bidi";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    DriverContainerComponent
  ],
    imports: [
        CommonModule,
        DriverRoutingModule,
        BidiModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatOptionModule,
        MatSelectModule
    ]
})
export class DriverModule { }
