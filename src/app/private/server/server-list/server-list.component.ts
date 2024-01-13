import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {ServerFormComponent} from "../server-form/server-form.component";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 123, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.scss']
})
export class ServerListComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'op'];
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
}
