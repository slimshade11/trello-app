import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Board } from '@boards/interfaces/board.interface';

@Injectable()
export class BoardsState {
  boards$: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);
  isBoardsLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  setBoards(boards: Board[]): void {
    this.boards$.next(boards);
  }

  getBoards$(): Observable<Board[]> {
    return this.boards$.asObservable();
  }

  setIsBoardsLoading(isLoading: boolean): void {
    this.isBoardsLoading$.next(isLoading);
  }

  getIsBoardsLoading$(): Observable<boolean> {
    return this.isBoardsLoading$.asObservable();
  }
}
