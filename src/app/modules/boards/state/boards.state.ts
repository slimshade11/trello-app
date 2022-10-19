import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Board } from '@boards/interfaces/board.interface';

@Injectable()
export class BoardsState {
  boards$: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);
  boardDetails$: BehaviorSubject<Board | null> =
    new BehaviorSubject<Board | null>(null);
  isBoardsLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  setBoards(boards: Board[]): void {
    this.boards$.next(boards);
  }

  getBoards$(): Observable<Board[]> {
    return this.boards$.asObservable();
  }

  setBoardDetails(board: Board | null): void {
    this.boardDetails$.next(board);
  }

  getBoardDetails$(): Observable<Board | null> {
    return this.boardDetails$.asObservable();
  }

  setIsBoardsLoading(isLoading: boolean): void {
    this.isBoardsLoading$.next(isLoading);
  }

  getIsBoardsLoading$(): Observable<boolean> {
    return this.isBoardsLoading$.asObservable();
  }
}
