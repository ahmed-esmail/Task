import * as moment from 'moment/moment';

import {
  Observable,
  catchError,
  filter,
  from,
  groupBy,
  map,
  mergeMap,
  reduce,
  throwError,
  toArray,
} from 'rxjs';

import { Employee } from '../_models/Employee';
import { EmployeeTotalWorkingHours } from '../_models/EmployeeInfo';
import { FROM_SECOND_TO_HOURS } from '../_consts/Units';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const { apiUrl, jsonUrl } = environment;
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}

  getEmployeesTotalWorkingHours(): Observable<EmployeeTotalWorkingHours[]> {
    return this.httpClient.get<Employee[]>(jsonUrl).pipe(
      mergeMap((result) => from(result)),
      filter(
        (employee) =>
          employee.EmployeeName !== null &&
          employee.StarTimeUtc !== null &&
          employee.EndTimeUtc !== null
      ),
      groupBy((item) => item.EmployeeName),
      mergeMap((group) =>
        group.pipe(
          reduce(
            (acc, curr) => {
              acc.Name = curr.EmployeeName;
              acc.WorkingDuration =
                acc.WorkingDuration +
                EmployeeService.calculateTotalWorkingInMilliSecond(curr);
              return acc;
            },
            { Name: '', WorkingDuration: 0 }
          ),
          map((group) => {
            return {
              Name: group.Name,
              WorkingHours: Math.ceil(
                group.WorkingDuration / FROM_SECOND_TO_HOURS
              ),
            };
          })
        )
      ),
      toArray(),
      catchError(this.errorHandler)
    );
  }

  private static calculateTotalWorkingInMilliSecond(employee: Employee) {
    const startTime = moment.utc(employee.StarTimeUtc);
    const endTime = moment.utc(employee.EndTimeUtc);
    if (startTime.isBefore(endTime)) {
      let duration = moment.duration(endTime.diff(startTime));
      return duration.asSeconds();
    }
    return 0;
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
