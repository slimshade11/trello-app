import { BoardsFacade } from '@boards/boards.facade';
import { Board } from '@boards/interfaces/board.interface';
import { Column } from '@boards/interfaces/column.interface';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { Component, OnInit } from '@angular/core';
import { CreateColumnPayload } from '@boards/interfaces/create-column-payload.interface';
import { TaskCustom } from '@boards/interfaces/task-custom.interface';
import { CreateTaskPayload } from '@boards/interfaces/create-task-payload.interface';
import { BoardData } from '@boards/interfaces/board-data.interface';
import { DialogService } from 'primeng/dynamicdialog';
import { TaskModalComponent } from '@boards/dialogs/task-modal/task-modal.component';
import {
  take,
  Observable,
  tap,
  combineLatest,
  map,
  takeUntil,
  skipWhile,
} from 'rxjs';
import {
  ActivatedRoute,
  NavigationStart,
  Params,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent extends DestroyComponent implements OnInit {
  boardDetails$!: Observable<Board | null>;
  boardData$!: Observable<BoardData>;

  boardId!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private boardsFacade: BoardsFacade,
    private router: Router,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadData();
    this.initializeListeners();
    this.initializeData();
  }

  initializeData(): void {
    this.boardData$ = combineLatest([
      this.boardsFacade.getBoardDetails$(),
      this.boardsFacade.getColumns$(),
      this.boardsFacade.getIsBoardsLoading$(),
      this.boardsFacade.getTasks$(),
    ]).pipe(
      map(
        ([boardDetails, columns, isDataLoading, tasks]: [
          Board | null,
          Column[],
          boolean,
          TaskCustom[]
        ]): BoardData => {
          return {
            boardDetails,
            columns,
            isDataLoading,
            tasks,
          };
        }
      ),
      skipWhile(({ boardDetails }: BoardData) => boardDetails === null),
      takeUntil(this.destroy$)
    );
  }

  loadData(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe({
      next: (params: Params): void => (this.boardId = params['id']),
    });

    this.boardsFacade
      .loadBoardById$(this.boardId)
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.boardsFacade
      .loadColumns$(this.boardId)
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.boardsFacade
      .loadTasks$(this.boardId)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  initializeListeners(): void {
    this.router.events
      .pipe(
        tap((event: any): void => {
          if (event instanceof NavigationStart) {
            this.boardsFacade.leaveBoard(this.boardId);
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.boardsFacade
      .listenToSocketCreateColumnSuccess$()
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.boardsFacade
      .listenToSocketCreateTaskSuccess$()
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.boardsFacade
      .listenToUpdateBoardName$()
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.boardsFacade
      .listenToDeleteBoardById$()
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.boardsFacade
      .listenToDeleteColumnById$()
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.boardsFacade
      .listenToUpdateColumn$()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  createColumn(title: string): void {
    const newColumn: CreateColumnPayload = {
      title,
      boardId: this.boardId,
    };

    this.boardsFacade.createColumn$(newColumn);
  }

  createTask(title: string, columnId: string): void {
    const newTask: CreateTaskPayload = {
      title,
      columnId,
      boardId: this.boardId,
    };

    this.boardsFacade.createTask$(newTask);
  }

  updateBoardName(boardName: string): void {
    this.boardsFacade.updateBoardName(this.boardId, { title: boardName });
  }

  updateColumnName(columnName: string, columnId: string): void {
    this.boardsFacade.updateColumnName(this.boardId, columnId, {
      title: columnName,
    });
  }

  deleteBoard(): void {
    if (confirm('Are you sure you want to delete the board?')) {
      this.boardsFacade.deleteBoard(this.boardId);
    }
  }

  deleteColumn(columnId: string): void {
    this.boardsFacade.deleteColumn(this.boardId, columnId);
  }

  openTask(taskId: string): void {
    const taskModalPayload = {
      taskId,
    };

    this.dialogService.open(TaskModalComponent, {
      header: '',
      style: { width: '90%', maxWidth: '400px' },
      data: taskModalPayload,
    });
  }
}
