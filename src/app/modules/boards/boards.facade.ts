import { ToastService } from '@services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Board } from '@boards/interfaces/board.interface';
import { Injectable } from '@angular/core';
import { BoardsApi } from '@boards/api/boards.api';
import { BoardsState } from '@boards/state/boards.state';
import { ToastStatus } from '@enums/toast-status.enum';
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
import { AuthFacade } from '@auth/auth.facade';

@Injectable()
export class BoardsFacade {
  constructor(
    private boardsApi: BoardsApi,
    private boardsState: BoardsState,
    private toastService: ToastService,
    private authFacade: AuthFacade
  ) {}

  loadBoards$(): Observable<Board[]> {
    this.boardsState.setIsBoardsLoading(true);
    return this.boardsApi.loadBoards$().pipe(
      tap((boards: Board[]) => this.boardsState.setBoards(boards)),
      catchError((err: HttpErrorResponse) => {
        return throwError(err);
      }),
      finalize(() => this.boardsState.setIsBoardsLoading(false))
    );
  }

  loadBoardById$(boardId: string): Observable<Board> {
    this.boardsState.setIsBoardsLoading(true);
    return this.boardsApi.loadBoardById(boardId).pipe(
      filter((board) => !!board),
      tap((board: Board) => this.boardsState.setBoardDetails(board)),
      catchError((err: HttpErrorResponse) => {
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
      switchMap((createdBoard: Board) => {
        return this.getBoards$().pipe(
          take(1),
          map((boards: Board[]) => [...boards, createdBoard]),
          tap((updatedBoards: Board[]) =>
            this.boardsState.setBoards(updatedBoards)
          ),
          catchError((err: HttpErrorResponse) => {
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
}
