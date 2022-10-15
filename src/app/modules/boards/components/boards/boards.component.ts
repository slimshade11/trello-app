import { Component, OnInit } from '@angular/core';
import { BoardsApi } from '../../api/boards.api';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  constructor(private boards: BoardsApi) {}

  ngOnInit(): void {
    this.boards.loadBoards$().subscribe((d) => {
      console.log('dwa');
      console.log(d);
    });
  }
}
