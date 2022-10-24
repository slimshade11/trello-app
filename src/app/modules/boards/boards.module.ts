import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsFacade } from '@boards/boards.facade';
import { BoardsComponent } from '@boards/components/boards/boards.component';
import { BoardsState } from '@boards/state/boards.state';
import { SharedModule } from '@shared/shared.module';
import { BoardComponent } from '@boards/components/board/board.component';
import { TasksApi } from '@boards/api/tasks.api';
import { BoardsApi } from '@boards/api/boards.api';
import { ColumnsApi } from '@boards/api/columns.api';
import { ColumnsState } from '@boards/state/columns.state';
import { TasksState } from '@boards/state/tasks.state';
import { GetTasksByColumnIdPipe } from './pipes/get-tasks-by-column-id.pipe';
import { BoardService } from '@boards/services/board.service';

@NgModule({
  declarations: [BoardsComponent, BoardComponent, GetTasksByColumnIdPipe],
  imports: [CommonModule, BoardsRoutingModule, SharedModule],
  providers: [
    BoardsFacade,
    BoardsState,
    TasksApi,
    BoardsApi,
    ColumnsApi,
    ColumnsState,
    TasksState,
    BoardService,
  ],
})
export class BoardsModule {}
