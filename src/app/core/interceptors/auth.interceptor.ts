import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersistanceService } from '@services/persistance.service';
import { Config } from '@enums/config.enum';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private persistanceService: PersistanceService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token: string = this.persistanceService.get(Config.TOKEN);

    request = request.clone({
      setHeaders: {
        Authorization: token ?? '',
      },
    });

    return next.handle(request);
  }
}
