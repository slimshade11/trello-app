import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { AuthModule } from '@auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { APP_CONFIG, APP_SERVICE_CONFIG } from '@services/app-config.service';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule, HttpClientModule],
  providers: [
    {
      provide: APP_SERVICE_CONFIG,
      useValue: APP_CONFIG,
    },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
