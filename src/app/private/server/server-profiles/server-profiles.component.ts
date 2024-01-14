import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

const ELEMENT_DATA: any[] = [
  {row: 1, name: 'Hydrogen', protocol: 1.0079, operator: 'H'},
  {row: 1, name: 'Hydrogen', protocol: 1.0079, operator: 'H'},
  {row: 1, name: 'Hydrogen', protocol: 1.0079, operator: 'H'},
  {row: 1, name: 'Hydrogen', protocol: 1.0079, operator: 'H'},
];

@Component({
  selector: 'app-server-profiles',
  templateUrl: './server-profiles.component.html',
  styleUrls: ['./server-profiles.component.scss']
})
export class ServerProfilesComponent {
  displayedColumns: string[] = ['row', 'name', 'protocol', 'operator', 'op'];
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
}
