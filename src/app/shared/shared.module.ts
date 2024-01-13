import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components/icon/icon.component';
import { CardComponent } from './components/card/card.component';



@NgModule({
    declarations: [
        IconComponent,
        CardComponent
    ],
  exports: [
    IconComponent,
    CardComponent
  ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
