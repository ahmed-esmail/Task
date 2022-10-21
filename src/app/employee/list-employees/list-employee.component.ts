import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortable} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {EmployeeTotalWorkingHours} from '../../_models/EmployeeInfo';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent implements OnChanges {
  showSpinner = false;

  displayedColumns: string[] = ['Name', 'WorkingHours'];
  dataSource!: MatTableDataSource<EmployeeTotalWorkingHours>;

  @Input() EmployeesList!: any[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initializeMatTable();
  }

  ngOnInit(): void {
    this.showSpinner = true;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private initializeMatTable() {
    this.dataSource = new MatTableDataSource(this.EmployeesList);
    this.showSpinner = false;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;
    this.matSort.sort({ id: 'WorkingHours', start: 'desc' } as MatSortable);
    console.log(this.EmployeesList);
  }
}
