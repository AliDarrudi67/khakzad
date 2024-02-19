import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MainService} from "../../../../core/services/main.service";
import {MatDialog} from "@angular/material/dialog";
import {ApiEndpoints} from "../../../../core/config/apiEndpoints";
import {ConfirmDialogComponent} from "../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {ActivatedRoute} from "@angular/router";
import {ServerGroupFormComponent} from "../server-group-form/server-group-form.component";

@Component({
  selector: 'app-server-group',
  templateUrl: './server-group.component.html',
  styleUrls: ['./server-group.component.scss']
})
export class ServerGroupComponent {
  items: any[] = []
  displayedColumns: string[] = ['name', 'app_id', 'country_code', 'is_active', 'op'];
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
    this.mainService.get(ApiEndpoints.serverGroup.list(this.appId)).subscribe(
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
    const dialog = this.dialog.open(ServerGroupFormComponent, dialogConfig)
    dialog.afterClosed().subscribe(
      (response) => {
        if (response?.result) {
          this.getItems()
        }
      }
    )
  }

  removeItem(id: string) {
    const dialogConfig = this.mainService.defaultDialogConfig
    const dialog = this.dialog.open(ConfirmDialogComponent, dialogConfig)
    dialog.afterClosed().subscribe(
      (response) => {
        if (response?.result) {
          this.mainService.delete(ApiEndpoints.user.remove(id)).subscribe(
            (result) => {
              this.getItems()
            }
          )
        }
      }
    )
  }

  changeServerGroupStatus(element: any, status: any) {
    this.mainService.get(status.checked?ApiEndpoints.serverGroup.unblock(this.appId,element?.id):ApiEndpoints.serverGroup.block(this.appId,element?.id)).subscribe(
      (response) => {
        this.getItems()
      }
    )
  }
}
