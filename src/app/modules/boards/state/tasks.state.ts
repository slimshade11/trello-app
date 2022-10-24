import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TaskCustom } from '@boards/interfaces/task-custom.interface';

@Injectable()
export class TasksState {
  tasks$: BehaviorSubject<TaskCustom[]> = new BehaviorSubject<TaskCustom[]>([]);

  setTasks(tasks: TaskCustom[]): void {
    this.tasks$.next(tasks);
  }

  getTasks$(): Observable<TaskCustom[]> {
    return this.tasks$.asObservable();
  }

  addTask(task: TaskCustom): void {
    const updatedTasks: TaskCustom[] = [...this.tasks$.getValue(), task];
    this.setTasks(updatedTasks);
  }
}
