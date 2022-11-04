import { TaskCustom } from '@boards/interfaces/task-custom.interface';
import { Pipe, PipeTransform } from '@angular/core';
import { BoardService } from '@boards/services/board.service';

@Pipe({
    name: 'getTasksByColumnId',
})
export class GetTasksByColumnIdPipe implements PipeTransform {
    constructor(private boardsService: BoardService) {}

    transform(tasks: TaskCustom[], columnId: string): TaskCustom[] {
        return this.boardsService.getTasksByColumnId(columnId, tasks);
    }
}
