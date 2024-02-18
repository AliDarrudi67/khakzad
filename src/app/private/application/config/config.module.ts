import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { ConfigContainerComponent } from './config-container/config-container.component';
import {BidiModule} from "@angular/cdk/bidi";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import { ConfigFormComponent } from './config-form/config-form.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    ConfigContainerComponent,
    ConfigFormComponent
  ],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    BidiModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule
  ]
})
export class ConfigModule { }
