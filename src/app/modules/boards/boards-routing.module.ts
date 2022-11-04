import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from '@boards/components/boards/boards.component';
import { AuthGuard } from '@auth/guards/auth.guard';
import { BoardComponent } from '@boards/components/board/board.component';

const routes: Routes = [
    {
        path: 'boards',
        component: BoardsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'boards/:id',
        component: BoardComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BoardsRoutingModule {}
