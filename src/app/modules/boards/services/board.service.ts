import { Injectable } from '@angular/core';
import { TaskCustom } from '@boards/interfaces/task-custom.interface';

@Injectable()
export class BoardService {
    getTasksByColumnId(columnId: string, tasks: TaskCustom[]): TaskCustom[] {
        return tasks.filter((task: TaskCustom): boolean => task.columnId === columnId);
    }
}
