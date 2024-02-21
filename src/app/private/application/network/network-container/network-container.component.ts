import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MainService} from "../../../../core/services/main.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiEndpoints} from "../../../../core/config/apiEndpoints";
import {NetworkFormComponent} from "../network-form/network-form.component";

@Component({
  selector: 'app-network-container',
  templateUrl: './network-container.component.html',
  styleUrls: ['./network-container.component.scss']
})
export class NetworkContainerComponent {
  networks: any[] = []
  displayedColumns: string[] = ['ad_network', 'is_active', 'op'];
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
    this.mainService.get(ApiEndpoints.network.list(this.appId)).subscribe(
      (response) => {
        this.networks = response?.data
        this.dataSource = new MatTableDataSource(this.networks);
      })
  }

  networkForm(data = {}) {
    const dialogConfig = this.mainService.defaultDialogConfig
    dialogConfig.data = {item:data,appId:this.appId}
    const dialog = this.dialog.open(NetworkFormComponent, dialogConfig)
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

  changeNetworkStatus(element: any, status: any) {
    this.mainService.get(status.checked ? ApiEndpoints.network.unblock(this.appId, element?.id) : ApiEndpoints.network.block(this.appId, element?.id)).subscribe(
      (response) => {
        this.getItems()
      }
    )
  }
}
