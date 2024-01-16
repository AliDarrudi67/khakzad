import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationContainerComponent } from './application-container/application-container.component';
import {BidiModule} from "@angular/cdk/bidi";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {SharedModule} from "../../shared/shared.module";
import {MatDialogModule} from "@angular/material/dialog";
import { ApplicationDetailsComponent } from './application-details/application-details.component';


@NgModule({
  declarations: [
    ApplicationContainerComponent,
    ApplicationDetailsComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    BidiModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    SharedModule,
    MatDialogModule
  ]
})
export class ApplicationModule { }
