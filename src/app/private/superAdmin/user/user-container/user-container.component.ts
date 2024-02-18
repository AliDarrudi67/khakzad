import {Component, ViewChild} from '@angular/core';
import {MainService} from "../../../../core/services/main.service";
import {ApiEndpoints} from "../../../../core/config/apiEndpoints";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {UserFormComponent} from "../user-form/user-form.component";
import {ConfirmDialogComponent} from "../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {ApplicationFormComponent} from "../../../application/application-form/application-form.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss']
})
export class UserContainerComponent {
  users: any[] = []
  displayedColumns: string[] = ['first_name', 'last_name', 'roles', 'email', 'username', 'is_active', 'created_at', 'op'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public mainService: MainService,
    private dialog: MatDialog,
    private router: Router,
    private matDialog: MatDialog
  ) {
    this.getUsers()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getUsers() {
    this.mainService.get(ApiEndpoints.user.list).subscribe(
      (response) => {
        this.users = response?.data
        this.dataSource = new MatTableDataSource(this.users);
      })
  }

  userForm(data = {}) {
    const dialogConfig = this.mainService.defaultDialogConfig
    dialogConfig.data = data
    const dialog = this.dialog.open(UserFormComponent, dialogConfig)
    dialog.afterClosed().subscribe(
      (response) => {
        if (response?.result) {
          this.getUsers()
        }
      }
    )
  }

  removeUser(id: string) {
    const dialogConfig = this.mainService.defaultDialogConfig
    const dialog = this.dialog.open(ConfirmDialogComponent, dialogConfig)
    dialog.afterClosed().subscribe(
      (response) => {
        if (response?.result) {
          this.mainService.delete(ApiEndpoints.user.remove(id)).subscribe(
            (result) => {
              this.getUsers()
            }
          )
        }
      }
    )
  }

  changeUserStatus(element: any, status: any) {
    console.log(element)
    console.log(status.checked)
    this.mainService.get(status.checked?ApiEndpoints.user.unblock(element?.id):ApiEndpoints.user.block(element?.id)).subscribe(
      (response) => {
        this.getUsers()
      }
    )
  }

  addApplication(id: string) {
    const dialogConfig = this.mainService.defaultDialogConfig
    dialogConfig.data = {
      user_id:id
    }
    const dialog = this.matDialog.open(ApplicationFormComponent, dialogConfig)
    dialog.afterClosed().subscribe(
      (response) => {
        this.router.navigate(['/dashboard/applications'])
      }
    )
  }
}
