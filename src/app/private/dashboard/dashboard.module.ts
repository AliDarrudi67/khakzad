import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatTreeModule} from "@angular/material/tree";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../../shared/shared.module";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    DashboardContainerComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    MatMenuModule
  ]
})
export class DashboardModule { }
