import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceRoutingModule } from './device-routing.module';
import { DeviceContainerComponent } from './device-container/device-container.component';
import {BidiModule} from "@angular/cdk/bidi";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {SharedModule} from "../../shared/shared.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import { DeviceDetailsComponent } from './device-details/device-details.component';


@NgModule({
  declarations: [
    DeviceContainerComponent,
    DeviceDetailsComponent
  ],
  imports: [
    CommonModule,
    DeviceRoutingModule,
    BidiModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    SharedModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class DeviceModule { }
