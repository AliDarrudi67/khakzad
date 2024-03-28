import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MainService} from "../../../../core/services/main.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {ApiEndpoints} from "../../../../core/config/apiEndpoints";
import {ConfigFormComponent} from "../config-form/config-form.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-config-container',
  templateUrl: './config-container.component.html',
  styleUrls: ['./config-container.component.scss']
})
export class ConfigContainerComponent {
  items: any[] = []
  displayedColumns: string[] = ['disconnect_delay_seconds', 'connect_delay_seconds', 'is_ads_enabled', 'latest_app_version_id', 'disable_old_versions', 'is_force_update_enabled', 'op'];
  dataSource = new MatTableDataSource();
  appId = ''
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  lang = localStorage.getItem('lang') ?? 'fa';
  direction: any = this.lang === 'fa' ? 'rtl' : 'ltr';

  constructor(
    private mainService: MainService,
    public translate: TranslateService,
    private dialog: MatDialog,
    private route: ActivatedRoute
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
    this.mainService.get(ApiEndpoints.config.list(this.appId)).subscribe(
      (response) => {
        if (response?.data?.connect_delay_seconds)
          this.items = [
            {
              connect_delay_seconds: response?.data?.connect_delay_seconds,
              disconnect_delay_seconds: response?.data?.disconnect_delay_seconds,
              is_ads_enabled: response?.data?.is_ads_enabled,
              disable_old_versions: response?.data?.disable_old_versions,
              is_force_update_enabled: response?.data?.is_force_update_enabled,
              latest_app_version: {
                id: response?.data?.latest_app_version?.id,
                versionCode: response?.data?.latest_app_version?.versionCode,
                versionName: response?.data?.latest_app_version?.versionName
              },
              encrypt_configs: response?.data?.encrypt_configs
            }
          ]
        this.dataSource = new MatTableDataSource(this.items);
      })
  }

  showForm(data: any = {}, mode = '') {
    console.log(data)
    if (!data?.appId)
      data.appId = this.appId
    data.formMode = data?.mode
    if (mode === 'add') {
      data.is_ads_enabled = false;
      data.disable_old_versions = false;
      data.is_force_update_enabled = false;
      data.encrypt_configs = false;
    }
    const dialogConfig = this.mainService.defaultDialogConfig
    dialogConfig.data = data
    const dialog = this.dialog.open(ConfigFormComponent, dialogConfig)
    dialog.afterClosed().subscribe(
      (response) => {
        if (response?.result) {
          this.getItems()
        }
      }
    )
  }

  // removeItem(id: string) {
  //   const dialogConfig = this.mainService.defaultDialogConfig
  //   const dialog = this.dialog.open(ConfirmDialogComponent, dialogConfig)
  //   dialog.afterClosed().subscribe(
  //     (response) => {
  //       if (response?.result) {
  //         this.mainService.delete(ApiEndpoints.config.remove(id)).subscribe(
  //           (result) => {
  //             this.getItems()
  //           }
  //         )
  //       }
  //     }
  //   )
  // }
}
