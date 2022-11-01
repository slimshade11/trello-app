import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TaskModalPayload } from '@boards/interfaces/task-modal-payload.interface';
import { TaskCustom } from '@boards/interfaces/task-custom.interface';
import { BoardsFacade } from '@boards/boards.facade';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit {
  task$!: Observable<TaskCustom>;

  taskModalData: TaskModalPayload = this.dialogConfig.data;

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private boardsFacade: BoardsFacade,
    private dialogRef: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.task$ = this.boardsFacade.getTaskById$(this.taskModalData.taskId);
  }

  updateTaskName(title: string): void {
    const { taskId, columnId } = this.taskModalData;
    this.boardsFacade.updateTask(taskId, columnId, { title });
  }

  updateTaskDescription(description: string): void {
    const { taskId, columnId } = this.taskModalData;
    this.boardsFacade.updateTask(taskId, columnId, {
      description,
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
