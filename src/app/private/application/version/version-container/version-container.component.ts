import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MainService} from "../../../../core/services/main.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiEndpoints} from "../../../../core/config/apiEndpoints";
import {VersionFormComponent} from "../version-form/version-form.component";

@Component({
  selector: 'app-version-container',
  templateUrl: './version-container.component.html',
  styleUrls: ['./version-container.component.scss']
})
export class VersionContainerComponent {
  versions: any[] = []
  displayedColumns: string[] = ['version_code', 'version_name', 'is_force_update', 'is_initial_version', 'download_url', 'is_play_store_download', 'is_active', 'op'];
  dataSource = new MatTableDataSource();
  appId = ''

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public mainService: MainService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog
  ) {
    this.appId = this.route.snapshot.params['id']
    this.getItems()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getItems() {
    this.mainService.get(ApiEndpoints.version.list(this.appId)).subscribe(
      (response) => {
        this.versions = response?.data
        this.dataSource = new MatTableDataSource(this.versions);
      })
  }

  itemForm(data = {}) {
    const dialogConfig = this.mainService.defaultDialogConfig
    dialogConfig.data = data
    const dialog = this.dialog.open(VersionFormComponent, dialogConfig)
    dialog.afterClosed().subscribe(
      (response) => {
        if (response?.result) {
          this.getItems()
        }
      }
    )
  }

  // removeUser(id: string) {
  //   const dialogConfig = this.mainService.defaultDialogConfig
  //   const dialog = this.dialog.open(ConfirmDialogComponent, dialogConfig)
  //   dialog.afterClosed().subscribe(
  //     (response) => {
  //       if (response?.result) {
  //         this.mainService.delete(ApiEndpoints.user.remove(id)).subscribe(
  //           (result) => {
  //             this.getUsers()
  //           }
  //         )
  //       }
  //     }
  //   )
  // }

  changeVersionStatus(element: any, status: any) {
    this.mainService.get(status.checked ? ApiEndpoints.version.unblock(this.appId, element?.id) : ApiEndpoints.version.block(this.appId, element?.id)).subscribe(
      (response) => {
        this.getItems()
      }
    )
  }

  versionForm(item: any) {
    const dialogConfig = {...this.mainService.defaultDialogConfig, data: {item, appId: this.appId}}
    const dialog = this.matDialog.open(VersionFormComponent, dialogConfig)
    dialog.afterClosed().subscribe(
      (response) => {
        if (response?.result)
          this.getItems()
      }
    )
  }
}
