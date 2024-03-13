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
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { ApplicationFormComponent } from './application-form/application-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    ApplicationContainerComponent,
    ApplicationDetailsComponent,
    ApplicationFormComponent
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
        MatDialogModule,
        MatSlideToggleModule,
        FormsModule,
        MatOptionModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatTooltipModule
    ]
})
export class ApplicationModule { }
