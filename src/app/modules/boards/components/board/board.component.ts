import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, take, Observable } from 'rxjs';
import { BoardsFacade } from '@boards/boards.facade';
import { Board } from '@boards/interfaces/board.interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  boardDetails$: Observable<Board | null> =
    this.boardsFacade.getBoardDetails$();
  isBoardDetailsLoading$: Observable<boolean> =
    this.boardsFacade.getIsBoardsLoading$();

  constructor(
    private activatedRoute: ActivatedRoute,
    private boardsFacade: BoardsFacade
  ) {}

  ngOnInit(): void {
    this.loadBoardById();
  }

  loadBoardById(): void {
    this.activatedRoute.params
      .pipe(
        take(1),
        switchMap((params: Params): Observable<Board> => {
          const boardId: string = params['id'];
          return this.boardsFacade.loadBoardById$(boardId);
        })
      )
      .subscribe();
  }
}
