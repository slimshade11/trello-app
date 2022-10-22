import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Column } from '@boards/interfaces/column.interface';

@Injectable({
  providedIn: 'root',
})
export class ColumnsState {
  columns$: BehaviorSubject<Column[]> = new BehaviorSubject<Column[]>([]);

  setColumns(columns: Column[]): void {
    this.columns$.next(columns);
  }

  getColumns$(): Observable<Column[]> {
    return this.columns$.asObservable();
  }
}
