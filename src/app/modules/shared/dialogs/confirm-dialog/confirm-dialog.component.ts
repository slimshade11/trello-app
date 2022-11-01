import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  constructor(private dialogRef: DynamicDialogRef) {}

  onSubmit(isDeleting: boolean): void {
    this.dialogRef.close(isDeleting);
  }
}
