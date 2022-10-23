import { ToastService } from '@services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Board } from '@boards/interfaces/board.interface';
import { Injectable } from '@angular/core';
import { BoardsApi } from '@boards/api/boards.api';
import { BoardsState } from '@boards/state/boards.state';
import { SocketService } from '@services/socket.service';
import { SocketEvents } from '@enums/socket-events.enum';
import { ToastStatus } from '@enums/toast-status.enum';
import { AuthFacade } from '@auth/auth.facade';
import { ColumnsApi } from '@boards/api/columns.api';
import { Column } from '@boards/interfaces/column.interface';
import { ColumnsState } from '@boards/state/columns.state';
import { CreateColumnPayload } from '@boards/interfaces/create-column-payload.interface';
import {
  Observable,
  tap,
  catchError,
  throwError,
  finalize,
  switchMap,
  map,
  take,
  filter,
} from 'rxjs';

@Injectable()
export class BoardsFacade {
  constructor(
    private boardsApi: BoardsApi,
    private boardsState: BoardsState,
    private toastService: ToastService,
    private authFacade: AuthFacade,
    private socketService: SocketService,
    private columnsApi: ColumnsApi,
    private columnsState: ColumnsState
  ) {}

  loadBoards$(): Observable<Board[]> {
    this.boardsState.setIsBoardsLoading(true);
    return this.boardsApi.loadBoards$().pipe(
      tap((boards: Board[]): void => this.boardsState.setBoards(boards)),
      catchError((err: HttpErrorResponse): Observable<never> => {
        return throwError(err);
      }),
      finalize((): void => this.boardsState.setIsBoardsLoading(false))
    );
  }

  loadColumns$(boardId: string): Observable<Column[]> {
    return this.columnsApi.loadColumns$(boardId).pipe(
      tap((columns: Column[]): void => this.columnsState.setColumns(columns)),
      catchError((err: HttpErrorResponse): Observable<never> => {
        return throwError(err);
      })
    );
  }

  loadBoardById$(boardId: string): Observable<Board> {
    this.socketService.emit(SocketEvents.BOARDS_JOIN, { boardId });

    this.boardsState.setIsBoardsLoading(true);
    return this.boardsApi.loadBoardById(boardId).pipe(
      filter((board): boolean => !!board),
      tap((board: Board) => this.boardsState.setBoardDetails(board)),
      catchError((err: HttpErrorResponse): Observable<never> => {
        this.toastService.showInfoMessage(
          ToastStatus.ERROR,
          'Error!',
          'Something went wrong'
        );
        return throwError(err);
      }),
      finalize(() => this.boardsState.setIsBoardsLoading(false))
    );
  }

  createBoard$(title: string): Observable<any> {
    return this.boardsApi.createBoard$(title).pipe(
      switchMap((createdBoard: Board): Observable<Board[]> => {
        return this.getBoards$().pipe(
          take(1),
          map((boards: Board[]): Board[] => [...boards, createdBoard]),
          tap((updatedBoards: Board[]): void =>
            this.boardsState.setBoards(updatedBoards)
          ),
          catchError((err: HttpErrorResponse): Observable<never> => {
            this.toastService.showInfoMessage(
              ToastStatus.ERROR,
              'Error!',
              'Something went wrong'
            );
            return throwError(err);
          })
        );
      })
    );
  }

  createColumn$(column: CreateColumnPayload) {
    this.socketService.emit(SocketEvents.COLUMNS_CREATE, column);
  }

  listenToSocketCreateColumnSuccess$(): Observable<Column> {
    return this.socketService
      .listen<Column>(SocketEvents.COLUMNS_CREATE_SUCCESS)
      .pipe(tap((column: Column): void => this.columnsState.addColumn(column)));
  }

  leaveBoard(boardId: string): void {
    this.boardsState.setBoardDetails(null);
    this.socketService.emit(SocketEvents.BOARDS_LEAVE, { boardId });
  }

  logout(): void {
    this.authFacade.logout();
  }

  getIsBoardsLoading$(): Observable<boolean> {
    return this.boardsState.getIsBoardsLoading$();
  }

  getBoards$(): Observable<Board[]> {
    return this.boardsState.getBoards$();
  }

  getBoardDetails$(): Observable<Board | null> {
    return this.boardsState.getBoardDetails$();
  }

  getColumns$(): Observable<Column[]> {
    return this.columnsState.getColumns$();
  }
}
