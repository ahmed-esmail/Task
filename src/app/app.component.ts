import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "./employee/employee.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TaskApp';

  EmployeesList!: any[]

  constructor(public employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.getEmployeeInfo();
  }

  private getEmployeeInfo() {
    this.employeeService.getEmployeesTotalWorkingHours().subscribe(
      {
        next: res => {
          this.EmployeesList = res
          console.log(res)
        },
        error: err => {
          console.log(err)
        }
      }
    );
  }
}
