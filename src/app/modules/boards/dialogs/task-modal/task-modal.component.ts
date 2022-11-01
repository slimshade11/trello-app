import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TaskModalPayload } from '@boards/interfaces/task-modal-payload.interface';
import { TaskCustom } from '@boards/interfaces/task-custom.interface';
import { Observable } from 'rxjs';
import { BoardsFacade } from '@boards/boards.facade';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit {
  task$!: Observable<TaskCustom>;

  data: TaskModalPayload = this.dialogConfig.data;

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private boardsFacade: BoardsFacade
  ) {}

  ngOnInit(): void {
    this.task$ = this.boardsFacade.getTaskById$(this.data.taskId);
  }

  updateTaskName(taskName: string): void {
    console.log('update task name', taskName);
  }

  updateTaskDescription(taskDescription: string): void {
    console.log('update task description', taskDescription);
  }
}
