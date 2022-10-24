import { Board } from '@boards/interfaces/board.interface';
import { Column } from '@boards/interfaces/column.interface';
import { TaskCustom } from '@boards/interfaces/task-custom.interface';

export interface BoardData {
  boardDetails: Board | null;
  columns: Column[];
  isDataLoading: boolean;
  tasks: TaskCustom[];
}
