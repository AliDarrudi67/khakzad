import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ApplicationDetailsComponent} from "../application-details/application-details.component";
import {MainService} from "../../../core/services/main.service";
import {ApiEndpoints} from "../../../core/config/apiEndpoints";
import {ApplicationFormComponent} from "../application-form/application-form.component";

@Component({
  selector: 'app-application-container',
  templateUrl: './application-container.component.html',
  styleUrls: ['./application-container.component.scss']
})
export class ApplicationContainerComponent {
  displayedColumns: string[] = ['en_app_name', 'per_app_name', 'package_name', 'api_key', 'youtube_channel', 'support_telegram_id', 'google_play_url', 'privacy_url', 'is_active', 'op'];
  dataSource = new MatTableDataSource();

  constructor(
    private mainService: MainService,
    private dialog: MatDialog
  ) {
    this.getItems()
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applicationDetails() {
    const dialog = this.dialog.open(ApplicationDetailsComponent, {
      maxHeight: '80vh',
      minWidth: '360px',
      autoFocus: false,
      disableClose: true
    })
  }

  getItems() {
    this.mainService.get(ApiEndpoints.application.list).subscribe(
      (response) => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
        this.dataSource = new MatTableDataSource(response?.data);
      }
    )
  }

  showForm(data = {}) {
    const dialogConfig = this.mainService.defaultDialogConfig
    dialogConfig.data = data
    const dialog = this.dialog.open(ApplicationFormComponent, dialogConfig)
    dialog.afterClosed().subscribe(
      (response) => {
        if (response?.result) {
          this.getItems()
        }
      }
    )
  }

  changeAppStatus(element: any, status: any) {
    this.mainService.get(status.checked ? ApiEndpoints.application.unblock(element?.id) : ApiEndpoints.user.block(element?.id)).subscribe(
      (response) => {
        this.getItems()
      }
    )
  }
}
