import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {SharedModule} from "../../shared/shared.module";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ProfileComponent,
    ChangePasswordComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule
    ]
})
export class UserModule { }
