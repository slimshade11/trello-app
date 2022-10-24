import { BoardsFacade } from '@boards/boards.facade';
import { Board } from '@boards/interfaces/board.interface';
import { Column } from '@boards/interfaces/column.interface';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { Component, OnInit } from '@angular/core';
import { CreateColumnPayload } from '@boards/interfaces/create-column-payload.interface';
import { BoardData } from '@boards/interfaces/board-data.interface';
import { take, Observable, tap, combineLatest, map, takeUntil } from 'rxjs';
import { TaskCustom } from '@boards/interfaces/task-custom.interface';
import { CreateTaskPayload } from '@boards/interfaces/create-task-payload.interface';
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
    private router: Router
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
}
