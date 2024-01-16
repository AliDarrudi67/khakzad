import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ServerFormComponent} from "../../server/server-form/server-form.component";
import {ServerDetailsComponent} from "../../server/server-details/server-details.component";
import {DeviceDetailsComponent} from "../device-details/device-details.component";

const ELEMENT_DATA: any[] = [
  {row: 1, application: 'Hydrogen', position: 1.0079, server: 'H'},
  {row: 1, application: 'Hydrogen', position: 1.0079, server: 'H'},
  {row: 1, application: 'Hydrogen', position: 1.0079, server: 'H'},
  {row: 1, application: 'Hydrogen', position: 1.0079, server: 'H'},
];

@Component({
  selector: 'app-device-container',
  templateUrl: './device-container.component.html',
  styleUrls: ['./device-container.component.scss']
})
export class DeviceContainerComponent {
  displayedColumns: string[] = ['row', 'application', 'position', 'server', 'op'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  showForm = false;

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

  deviceDetails() {
    const dialog = this.dialog.open(DeviceDetailsComponent, {
      maxHeight: '80vh',
      minWidth: '360px',
      autoFocus: false,
      disableClose: true
    })
  }
}
