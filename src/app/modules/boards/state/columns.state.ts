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
        this.setColumns(updatedColumns);
    }

    deleteColumn(columnId: string): void {
        const updatedColumns: Column[] = this.columns$
            .getValue()
            .filter(({ id }: Column): boolean => id !== columnId);

        this.setColumns(updatedColumns);
    }

    updateColumn(updatedColumn: Column): void {
        const updatedColumns: Column[] = this.columns$.getValue().map((column: Column): Column => {
            if (column.id === updatedColumn.id) {
                return { ...column, title: updatedColumn.title };
            }

            return column;
        });

        this.setColumns(updatedColumns);
    }
}
