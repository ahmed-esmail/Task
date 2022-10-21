import {Component, Input} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {IAccTooltipRenderEventArgs} from "@syncfusion/ej2-angular-charts";

@Component({
  selector: 'app-chart-employees',
  templateUrl: './chart-employee.component.html',
  styleUrls: ['./chart-employee.component.css']
})
export class ChartEmployeeComponent {

  public chartTitle: string = ""
  public chartLabel: Object
  public legend: object
  public tooltipSettings: object

  @Input() EmployeesList: any[] = []


  constructor(public employeeService: EmployeeService) {
    this.chartTitle = "Employee Working Hours in a Month";
    this.chartLabel = {
      visible: true,
      position: 'Outside',
      name: 'Name'
    }
    this.legend = {
      visible: true,
      position: 'Bottom',
      height: '80px',
      width: '1100px'
    }
    this.tooltipSettings = {
      enable: true,
    }
  }


  tooltipRender(args: IAccTooltipRenderEventArgs): void {
    let value = args.point.y / args.series.sumOfPoints * 100;
    args["text"] = args.point.x + ' : ' + Math.ceil(value) + '' + '%';
  }

}
