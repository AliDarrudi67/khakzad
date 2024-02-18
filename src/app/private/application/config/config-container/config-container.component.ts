import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MainService} from "../../../../core/services/main.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {ApiEndpoints} from "../../../../core/config/apiEndpoints";
import {ConfigFormComponent} from "../config-form/config-form.component";

@Component({
  selector: 'app-config-container',
  templateUrl: './config-container.component.html',
  styleUrls: ['./config-container.component.scss']
})
export class ConfigContainerComponent {
  items: any[] = []
  displayedColumns: string[] = ['ad_network', 'ad_network_app_id', 'is_active', 'op'];
  dataSource = new MatTableDataSource();
  appId = ''
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private mainService: MainService,
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
        this.items = response?.data
        this.dataSource = new MatTableDataSource(this.items);
      })
  }

  showForm(data: any = {}) {
    if (!data?.appId)
      data.appId = this.appId
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
