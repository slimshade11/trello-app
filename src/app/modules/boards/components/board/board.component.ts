import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationStart,
  Params,
  Router,
} from '@angular/router';
import { switchMap, take, Observable, tap } from 'rxjs';
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

  boardId!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private boardsFacade: BoardsFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBoardById();
    this.initializeListeners();
  }

  loadBoardById(): void {
    this.activatedRoute.params
      .pipe(
        take(1),
        switchMap((params: Params): Observable<Board> => {
          this.boardId = params['id'];

          return this.boardsFacade.loadBoardById$(this.boardId);
        })
      )
      .subscribe();
  }

  initializeListeners(): void {
    this.router.events
      .pipe(
        tap((event: any): void => {
          if (event instanceof NavigationStart) {
            console.log('leaving a page');
            this.boardsFacade.leaveBoard(this.boardId);
          }
        })
      )
      .subscribe();
  }
}
