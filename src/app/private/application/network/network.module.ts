import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetworkRoutingModule } from './network-routing.module';
import { NetworkContainerComponent } from './network-container/network-container.component';
import {BidiModule} from "@angular/cdk/bidi";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {SharedModule} from "../../../shared/shared.module";
import { NetworkFormComponent } from './network-form/network-form.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    NetworkContainerComponent,
    NetworkFormComponent
  ],
  imports: [
    CommonModule,
    NetworkRoutingModule,
    BidiModule,
    FormsModule,
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
export class NetworkModule { }
