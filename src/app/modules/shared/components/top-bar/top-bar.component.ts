import { takeUntil } from 'rxjs';
import { Component } from '@angular/core';
import { BoardsFacade } from '@boards/boards.facade';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmDialogComponent } from '@shared/dialogs/confirm-dialog/confirm-dialog.component';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent extends DestroyComponent {
    constructor(private boardsFacade: BoardsFacade, private dialogService: DialogService) {
        super();
    }

    logout(): void {
        const dialogRef = this.dialogService.open(ConfirmDialogComponent, {
            header: 'Are you sure you want to logout?',
        });

        dialogRef.onClose.pipe(takeUntil(this.destroy$)).subscribe({
            next: (isLoggingOut: boolean): void => {
                if (!isLoggingOut) return;

                this.boardsFacade.logout();
            },
        });
    }
}
