import { Component, OnInit } from '@angular/core';
import { BoardsFacade } from '@boards/boards.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  isBoardsLoading$: Observable<boolean> =
    this.boardsFacade.getIsBoardsLoading$();

  constructor(private boardsFacade: BoardsFacade) {}

  ngOnInit(): void {
    this.boardsFacade.getBoards$().subscribe((d) => {
      console.log(d);
    });
  }
}
