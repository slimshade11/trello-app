import { BoardsFacade } from '@boards/boards.facade';
import { Board } from '@boards/interfaces/board.interface';
import { Column } from '@boards/interfaces/column.interface';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationStart,
  Params,
  Router,
} from '@angular/router';
import {
  switchMap,
  take,
  Observable,
  tap,
  combineLatest,
  map,
  takeUntil,
} from 'rxjs';

interface BoardData {
  boardDetails: Board | null;
  columns: Column[];
  isDataLoading: boolean;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent extends DestroyComponent implements OnInit {
  boardDetails$!: Observable<Board | null>;
  data$!: Observable<BoardData>;

  boardId!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private boardsFacade: BoardsFacade,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadBoardById();
    this.initializeListeners();
    this.initializeData();
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

  initializeData(): void {
    this.data$ = combineLatest([
      this.boardsFacade.getBoardDetails$(),
      this.boardsFacade.getColumns$(),
      this.boardsFacade.getIsBoardsLoading$(),
    ]).pipe(
      map(
        ([boardDetails, columns, isDataLoading]: [
          Board | null,
          Column[],
          boolean
        ]): BoardData => ({
          boardDetails,
          columns,
          isDataLoading,
        })
      ),
      takeUntil(this.destroy$)
    );
  }
}
