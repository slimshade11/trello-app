import { SocketService } from '@services/socket.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Column } from '@boards/interfaces/column.interface';

@Injectable()
export class ColumnsState {
  columns$: BehaviorSubject<Column[]> = new BehaviorSubject<Column[]>([]);

  setColumns(columns: Column[]): void {
    this.columns$.next(columns);
  }

  getColumns$(): Observable<Column[]> {
    return this.columns$.asObservable();
  }

  addColumn(column: Column): void {
    const updatedColumns: Column[] = [...this.columns$.getValue(), column];
    this.columns$.next(updatedColumns);
  }

  deleteColumn(columnId: string): void {
    const updatedColumns: Column[] = this.columns$
      .getValue()
      .filter(({ id }: Column) => id !== columnId);

    this.setColumns(updatedColumns);
  }
}
