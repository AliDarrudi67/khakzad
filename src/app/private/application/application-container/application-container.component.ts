import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ServerFormComponent} from "../../server/server-form/server-form.component";
import {ServerDetailsComponent} from "../../server/server-details/server-details.component";
import {ApplicationDetailsComponent} from "../application-details/application-details.component";

const ELEMENT_DATA: any[] = [
  {row: 1, name: 'Hydrogen', package: 1.0079, applicationAdmin: 'H', apiKey: 'dsad3232khjk32j32'},
  {row: 2, name: 'Hydrogen', package: 1.0079, applicationAdmin: 'H', apiKey: 'dsad3232khjk32j32'},
  {row: 3, name: 'Hydrogen', package: 1.0079, applicationAdmin: 'H', apiKey: 'dsad3232khjk32j32'},
  {row: 4, name: 'Hydrogen', package: 1.0079, applicationAdmin: 'H', apiKey: 'dsad3232khjk32j32'},
];

@Component({
  selector: 'app-application-container',
  templateUrl: './application-container.component.html',
  styleUrls: ['./application-container.component.scss']
})
export class ApplicationContainerComponent {
  displayedColumns: string[] = ['row', 'name', 'package', 'applicationAdmin','apiKey', 'op'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(
    private dialog: MatDialog
  ) {
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

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
}
