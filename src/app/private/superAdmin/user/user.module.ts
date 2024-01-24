import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserContainerComponent} from './user-container/user-container.component';
import {BidiModule} from "@angular/cdk/bidi";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {SharedModule} from "../../../shared/shared.module";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {UserFormComponent} from './user-form/user-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    UserContainerComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    BidiModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    SharedModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule
  ]
})
export class UserModule {
}
