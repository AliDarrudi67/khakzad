import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VersionRoutingModule} from './version-routing.module';
import {VersionContainerComponent} from './version-container/version-container.component';
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
import { VersionFormComponent } from './version-form/version-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    VersionContainerComponent,
    VersionFormComponent
  ],
  imports: [
    CommonModule,
    VersionRoutingModule,
    BidiModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    SharedModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class VersionModule {
}
