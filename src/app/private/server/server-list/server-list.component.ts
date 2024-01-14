import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {ServerFormComponent} from "../server-form/server-form.component";
import {ServerDetailsComponent} from "../server-details/server-details.component";

const ELEMENT_DATA: any[] = [
  {row: 1, application: 'Hydrogen', position: 1.0079, server: 'H'},
  {row: 1, application: 'Hydrogen', position: 1.0079, server: 'H'},
  {row: 1, application: 'Hydrogen', position: 1.0079, server: 'H'},
  {row: 1, application: 'Hydrogen', position: 1.0079, server: 'H'},
];

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.scss']
})
export class ServerListComponent implements AfterViewInit {
  displayedColumns: string[] = ['row', 'application', 'position', 'server', 'op'];
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

  serverForm() {
    const dialog = this.dialog.open(ServerFormComponent, {
      maxHeight: '80vh',
      minWidth: '360px',
      autoFocus: false,
      disableClose: true
    })
  }

  serverDetails() {
    const dialog = this.dialog.open(ServerDetailsComponent, {
      maxHeight: '80vh',
      minWidth: '360px',
      autoFocus: false,
      disableClose: true
    })
  }
}
