import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components/icon/icon.component';
import { CardComponent } from './components/card/card.component';
import { PersianDatePipe } from './pipes/persian-date.pipe';



@NgModule({
    declarations: [
        IconComponent,
        CardComponent,
        PersianDatePipe
    ],
    exports: [
        IconComponent,
        CardComponent,
        PersianDatePipe
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
