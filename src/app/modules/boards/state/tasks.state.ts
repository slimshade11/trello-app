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

    deleteTask(columnId: string): void {
        const updatedTasks: TaskCustom[] = this.tasks$
            .getValue()
            .filter(({ id }: TaskCustom): boolean => id !== columnId);

        this.setTasks(updatedTasks);
    }

    updateTasks(updatedTask: TaskCustom): void {
        const updatedTasks = this.tasks$.getValue().map((task: TaskCustom): TaskCustom => {
            if (task.id === updatedTask.id) {
                const { title, description, columnId } = updatedTask;
                return {
                    ...task,
                    title,
                    description,
                    columnId,
                };
            }

            return task;
        });
        this.setTasks(updatedTasks);
    }
}
