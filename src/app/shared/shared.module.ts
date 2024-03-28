import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components/icon/icon.component';
import { CardComponent } from './components/card/card.component';
import { PersianDatePipe } from './pipes/persian-date.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import { NumericInputDirective } from './directives/numeric-input.directive';



@NgModule({
    declarations: [
        IconComponent,
        CardComponent,
        PersianDatePipe,
        ConfirmDialogComponent,
        NumericInputDirective
    ],
    exports: [
        IconComponent,
        CardComponent,
        PersianDatePipe,
        NumericInputDirective
    ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class SharedModule { }
