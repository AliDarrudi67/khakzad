import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MainService} from "../../../../../core/services/main.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiEndpoints} from "../../../../../core/config/apiEndpoints";
import {AdPlacementFormComponent} from "../ad-placement-form/ad-placement-form.component";

@Component({
  selector: 'app-ad-placement-container',
  templateUrl: './ad-placement-container.component.html',
  styleUrls: ['./ad-placement-container.component.scss']
})
export class AdPlacementContainerComponent {
  adPlaces: any[] = []
  displayedColumns: string[] = ['unit_id', 'unit_type', 'interval_second', 'is_active', 'op'];
  dataSource = new MatTableDataSource();
  appId = ''
  networkId = ''

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
    this.networkId = this.route.snapshot.params['networkId']
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
    this.mainService.get(ApiEndpoints.adPlacement.list(this.appId, this.networkId)).subscribe(
      (response) => {
        this.adPlaces = response?.data
        this.dataSource = new MatTableDataSource(this.adPlaces);
      })
  }

  adPlaceForm(data = {}) {
    const dialogConfig = this.mainService.defaultDialogConfig
    dialogConfig.data = {item: data, appId: this.appId, networkId: this.networkId}
    const dialog = this.dialog.open(AdPlacementFormComponent, dialogConfig)
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

  changeAdPlaceStatus(element: any, status: any) {
    this.mainService.get(status.checked ? ApiEndpoints.adPlacement.unblock(this.appId, element?.id) : ApiEndpoints.adPlacement.block(this.appId, element?.id)).subscribe(
      (response) => {
        this.getItems()
      }
    )
  }
}
