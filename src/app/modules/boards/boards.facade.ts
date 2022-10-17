import { ToastService } from '@services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Board } from '@boards/interfaces/board.interface';
import {
  Observable,
  tap,
  catchError,
  throwError,
  finalize,
  switchMap,
  map,
  take,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { BoardsApi } from '@boards/api/boards.api';
import { BoardsState } from '@boards/state/boards.state';
import { ToastStatus } from '@app/core/enums/toast-status.enum';

@Injectable()
export class BoardsFacade {
  constructor(
    private boardsApi: BoardsApi,
    private boardsState: BoardsState,
    private toastService: ToastService
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

  getIsBoardsLoading$(): Observable<boolean> {
    return this.boardsState.getIsBoardsLoading$();
  }

  getBoards$(): Observable<Board[]> {
    return this.boardsState.getBoards$();
  }
}
