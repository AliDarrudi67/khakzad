import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MainService} from "../../../../core/services/main.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {ApiEndpoints} from "../../../../core/config/apiEndpoints";
import {ConfirmDialogComponent} from "../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {ServerFormComponent} from "../server-form/server-form.component";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent {
  items: any[] = []
  displayedColumns: string[] = ['country_code', 'remarks', 'server_uri', 'address', 'port', 'mnc', 'asn', 'is_active', 'op'];
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
    this.mainService.get(ApiEndpoints.server.list(this.appId)).subscribe(
      (response) => {
        console.log(response)
        this.items = response?.data.length ? response?.data[0]?.server_list : []
        console.log(this.items)
        this.dataSource = new MatTableDataSource(this.items);
      })
  }

  showForm(data: any = {}) {
    if (!data?.appId)
      data.appId = this.appId
    const dialogConfig = this.mainService.defaultDialogConfig
    dialogConfig.data = data
    const dialog = this.dialog.open(ServerFormComponent, dialogConfig)
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
          // this.mainService.delete(ApiEndpoints.server.remove(id)).subscribe(
          //   (result) => {
          //     this.getItems()
          //   }
          // )
        }
      }
    )
  }

  changeServerStatus(element: any, status: any) {
    this.mainService.get(status.checked?ApiEndpoints.server.unblock(this.appId,element?.id):ApiEndpoints.server.block(this.appId,element?.id)).subscribe(
      (response) => {
        this.getItems()
      }
    )
  }
}
