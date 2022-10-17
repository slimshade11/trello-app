import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsFacade } from '@boards/boards.facade';
import { BoardsComponent } from '@boards/components/boards/boards.component';
import { BoardsState } from '@boards/state/boards.state';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [BoardsComponent],
  imports: [CommonModule, BoardsRoutingModule, SharedModule],
  providers: [BoardsFacade, BoardsState],
})
export class BoardsModule {}
