import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { AuthModule } from '@auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_CONFIG, APP_SERVICE_CONFIG } from '@services/app-config.service';
import { MessageService } from 'primeng/api';
import { AuthInterceptor } from '@interceptors/auth.interceptor';
import { BoardsModule } from '@boards/boards.module';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        HttpClientModule,
        BoardsModule,
        SharedModule,
        BrowserAnimationsModule,
    ],
    providers: [
        {
            provide: APP_SERVICE_CONFIG,
            useValue: APP_CONFIG,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        MessageService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
