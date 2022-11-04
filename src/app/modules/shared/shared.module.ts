import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MenubarComponent } from '@shared/components/menubar/menubar.component';
import { InlineFormComponent } from '@shared/components/inline-form/inline-form.component';
import { TopBarComponent } from '@shared/components/top-bar/top-bar.component';
import { ConfirmDialogComponent } from '@shared/dialogs/confirm-dialog/confirm-dialog.component';

//Primeng modules
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CardModule } from 'primeng/card';

@NgModule({
    declarations: [MenubarComponent, InlineFormComponent, TopBarComponent, ConfirmDialogComponent],
    imports: [
        CommonModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        ProgressSpinnerModule,
        ToastModule,
        MenubarModule,
        ReactiveFormsModule,
        InputTextareaModule,
        DynamicDialogModule,
        CardModule,
    ],
    exports: [
        InputTextModule,
        PasswordModule,
        ButtonModule,
        ProgressSpinnerModule,
        ToastModule,
        MenubarModule,
        MenubarComponent,
        InputTextareaModule,
        InlineFormComponent,
        TopBarComponent,
        DynamicDialogModule,
        CardModule,
        ConfirmDialogComponent,
    ],
})
export class SharedModule {}
