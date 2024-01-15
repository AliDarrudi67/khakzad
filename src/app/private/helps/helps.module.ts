import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpsRoutingModule } from './helps-routing.module';
import { HelpContainerComponent } from './help-container/help-container.component';


@NgModule({
  declarations: [
    HelpContainerComponent
  ],
  imports: [
    CommonModule,
    HelpsRoutingModule
  ]
})
export class HelpsModule { }
