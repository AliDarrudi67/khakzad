import {Component, effect, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ApplicationDetailsComponent} from "../application-details/application-details.component";
import {MainService} from "../../../core/services/main.service";
import {ApiEndpoints} from "../../../core/config/apiEndpoints";
import {ApplicationFormComponent} from "../application-form/application-form.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-application-container',
  templateUrl: './application-container.component.html',
  styleUrls: ['./application-container.component.scss']
})
export class ApplicationContainerComponent {
  displayedColumns: string[] = ['en_app_name', 'per_app_name', 'package_name', 'api_key', 'is_active', 'op'];
  dataSource = new MatTableDataSource();
  roles: any[] = []
  userId = '';
  userApplicationsId = ''

  constructor(
    private mainService: MainService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.userApplicationsId = this.route.snapshot.params['id']
  }

  userData = effect(() => {
    this.roles = this.mainService.roles()
    this.userId = this.mainService.userInfo()?.id
    if (this.roles.length)
      this.getItems()
  })
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
    console.log(this.roles)
    let path = '';

    if (this.userApplicationsId) {
      path = ApiEndpoints.application.userApplications(this.userApplicationsId)
    } else if(this.roles.includes('super_admin')){
      path=ApiEndpoints.application.list
    }else{
      path=ApiEndpoints.admin.application.list
    }

    // if(this.roles.includes('super_admin')){
    //   if(this.userApplicationsId){
    //     path=ApiEndpoints.application.userApplications(this.userApplicationsId)
    //   }else{
    //     path=ApiEndpoints.application.list
    //   }
    // }else if(this.roles.includes('admin')){
    //   path=ApiEndpoints.admin.application.list
    // }else{
    //   path=ApiEndpoints.user.application.list
    // }

    this.mainService.get(path).subscribe(
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
    console.log(status)
    this.mainService.get(status.checked ? ApiEndpoints.application.unblock(element?.id) : ApiEndpoints.application.block(element?.id)).subscribe(
      (response) => {
        this.getItems()
      }
    )
  }

  viewUsers(element: any) {
    this.mainService.get(ApiEndpoints.application.users(element?.id)).subscribe(
      (response) => {
        const dialog = this.dialog.open(ApplicationDetailsComponent, {
          ...this.mainService.defaultDialogConfig,
          data: {
            users: response?.data,
            appId: element?.id
          }
        })
      }
    )
  }
}
