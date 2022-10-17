import { Component } from '@angular/core';
import { BoardsFacade } from '@boards/boards.facade';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  constructor(private boardsFacade: BoardsFacade) {}

  logout(): void {
    this.boardsFacade.logout();
  }
}
