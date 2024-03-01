import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdPlacementRoutingModule } from './ad-placement-routing.module';
import { AdPlacementContainerComponent } from './ad-placement-container/ad-placement-container.component';
import {BidiModule} from "@angular/cdk/bidi";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {SharedModule} from "../../../../shared/shared.module";
import { AdPlacementFormComponent } from './ad-placement-form/ad-placement-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    AdPlacementContainerComponent,
    AdPlacementFormComponent
  ],
  imports: [
    CommonModule,
    AdPlacementRoutingModule,
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
    MatDialogModule,
    MatOptionModule,
    MatSelectModule
  ]
})
export class AdPlacementModule { }
