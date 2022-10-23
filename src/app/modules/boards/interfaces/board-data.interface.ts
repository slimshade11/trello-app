import { Board } from '@boards/interfaces/board.interface';
import { Column } from '@boards/interfaces/column.interface';

export interface BoardData {
  boardDetails: Board | null;
  columns: Column[];
  isDataLoading: boolean;
}
