import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationSettingRoutingModule } from './application-setting-routing.module';
import { ApplicationSettingContainerComponent } from './application-setting-container/application-setting-container.component';
import {SharedModule} from "../../../shared/shared.module";
import {MatTabsModule} from "@angular/material/tabs";
import { AppSettingComponent } from './app-setting/app-setting.component';
import { AdmobSettingComponent } from './admob-setting/admob-setting.component';
import { BlackListComponent } from './black-list/black-list.component';
import {MatInputModule} from "@angular/material/input";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import { ServerComponent } from './server/server.component';
import { ServerGroupComponent } from './server-group/server-group.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ServerGroupFormComponent } from './server-group-form/server-group-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { ServerFormComponent } from './server-form/server-form.component';


@NgModule({
  declarations: [
    ApplicationSettingContainerComponent,
    AppSettingComponent,
    AdmobSettingComponent,
    BlackListComponent,
    ServerComponent,
    ServerGroupComponent,
    ServerGroupFormComponent,
    ServerFormComponent
  ],
    imports: [
        CommonModule,
        ApplicationSettingRoutingModule,
        SharedModule,
        MatTabsModule,
        MatInputModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatOptionModule,
        MatSelectModule
    ]
})
export class ApplicationSettingModule { }
