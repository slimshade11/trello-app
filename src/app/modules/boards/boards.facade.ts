import { HttpErrorResponse } from '@angular/common/http';
import { Board } from './interfaces/board.interface';
import { Observable, tap, catchError, throwError, finalize } from 'rxjs';
import { Injectable } from '@angular/core';
import { BoardsApi } from '@boards/api/boards.api';
import { BoardsState } from '@boards/state/boards.state';

@Injectable()
export class BoardsFacade {
  constructor(private boardsApi: BoardsApi, private boardsState: BoardsState) {}

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

  getIsBoardsLoading$(): Observable<boolean> {
    return this.boardsState.getIsBoardsLoading$();
  }

  getBoards$(): Observable<Board[]> {
    return this.boardsState.getBoards$();
  }
}
