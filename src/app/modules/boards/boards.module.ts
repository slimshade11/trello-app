import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsFacade } from '@boards/boards.facade';
import { BoardsComponent } from '@boards/components/boards/boards.component';
import { BoardsState } from '@boards/state/boards.state';

@NgModule({
  declarations: [BoardsComponent],
  imports: [CommonModule, BoardsRoutingModule],
  providers: [BoardsFacade, BoardsState],
})
export class BoardsModule {}
