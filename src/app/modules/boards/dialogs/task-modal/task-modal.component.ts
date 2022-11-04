import { Observable, take, takeUntil } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TaskModalPayload } from '@boards/interfaces/task-modal-payload.interface';
import { TaskCustom } from '@boards/interfaces/task-custom.interface';
import { BoardsFacade } from '@boards/boards.facade';
import { DestroyComponent } from '@app/standalone/components/destroy/destroy.component';

@Component({
    selector: 'app-task-modal',
    templateUrl: './task-modal.component.html',
    styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent extends DestroyComponent implements OnInit {
    task$!: Observable<TaskCustom>;

    taskModalData: TaskModalPayload = this.dialogConfig.data;

    constructor(
        private dialogConfig: DynamicDialogConfig,
        private boardsFacade: BoardsFacade,
        private dialogRef: DynamicDialogRef
    ) {
        super();
    }

    ngOnInit(): void {
        this.task$ = this.boardsFacade.getTaskById$(this.taskModalData.taskId);

        this.boardsFacade.listenToSocketUpdateTask$().pipe(takeUntil(this.destroy$)).subscribe();
    }

    updateTaskName(title: string): void {
        const { taskId, boardId } = this.taskModalData;
        this.boardsFacade.updateTask(boardId, taskId, { title });
    }

    updateTaskDescription(description: string): void {
        const { taskId, boardId } = this.taskModalData;
        this.boardsFacade.updateTask(boardId, taskId, {
            description,
        });
    }

    onDeleteTaskClick(): void {
        const { taskId, boardId } = this.taskModalData;
        this.boardsFacade.deleteTask(boardId, taskId);
        this.dialogRef.close();
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}
