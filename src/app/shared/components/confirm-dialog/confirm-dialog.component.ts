import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  lang = localStorage.getItem('lang') ?? 'fa';
  direction: any = this.lang === 'fa' ? 'rtl' : 'ltr';


  constructor(
    public translate:TranslateService,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
  ) {
  }

  setResponse(param: boolean) {
    this.dialogRef.close({result: param});
  }

}
