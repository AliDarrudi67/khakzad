import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServerRoutingModule } from './server-routing.module';
import { ServerListComponent } from './server-list/server-list.component';
import {SharedModule} from "../../shared/shared.module";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import { ServerFormComponent } from './server-form/server-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    ServerListComponent,
    ServerFormComponent
  ],
  imports: [
    CommonModule,
    ServerRoutingModule,
    SharedModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule
  ]
})
export class ServerModule { }
