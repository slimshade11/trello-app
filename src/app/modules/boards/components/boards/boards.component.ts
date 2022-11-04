import { Board } from '@boards/interfaces/board.interface';
import { Component, OnInit } from '@angular/core';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { BoardsFacade } from '@boards/boards.facade';
import { Observable, takeUntil } from 'rxjs';

@Component({
    selector: 'app-boards',
    templateUrl: './boards.component.html',
    styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent extends DestroyComponent implements OnInit {
    isBoardsLoading$: Observable<boolean> = this.boardsFacade.getIsBoardsLoading$();
    boards$: Observable<Board[]> = this.boardsFacade.getBoards$();
    username$: Observable<string> = this.boardsFacade.getUsername$();

    constructor(private boardsFacade: BoardsFacade) {
        super();
    }

    ngOnInit(): void {
        this.boardsFacade.loadBoards$().pipe(takeUntil(this.destroy$)).subscribe();
    }

    createBoard(title: string): void {
        this.boardsFacade.createBoard$(title).subscribe();
    }
}
