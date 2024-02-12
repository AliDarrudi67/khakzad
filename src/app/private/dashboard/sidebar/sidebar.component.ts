import {Component} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {FlatTreeControl} from '@angular/cdk/tree';
import {Router} from "@angular/router";
import {MainService} from "../../../core/services/main.service";
import {ApiEndpoints} from "../../../core/config/apiEndpoints";

const TREE_DATA: any[] = [
  {
    name: 'Fruit',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  url = '';
  roles: any[] = []

  constructor(
    private router: Router,
    private mainService: MainService
  ) {
    this.roles = this.mainService.roles()
    this.getCurrentUser()
    this.dataSource.data = TREE_DATA;
    this.router.events.subscribe((event) => {
      this.url = location.pathname
    })
  }

  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<any>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: any) => node.expandable;

  getCurrentUser() {
    this.mainService.get(ApiEndpoints.user.currentUser).subscribe(
      (response) => {
        this.mainService.userInfo.set(response?.data)
        this.mainService.roles.set(response?.data?.roles)
        this.roles = response?.data?.roles
      }
    )
  }
}
