import { AppConfig } from '@interfaces/app-config.interface';
import { APP_SERVICE_CONFIG } from '@services/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from '@auth/interfaces/register-request.interface';
import { CurrentUser } from '@auth/interfaces/current-user.interface';
import { LoginRequest } from '@auth/interfaces/login-request.interface';

@Injectable()
export class AuthApi {
  constructor(
    @Inject(APP_SERVICE_CONFIG) private appConfig: AppConfig,
    private http: HttpClient
  ) {}

  loadCurrentUser$(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(`${this.appConfig.BASE_URL}/user`);
  }

  register$(registerPayload: RegisterRequest): Observable<CurrentUser> {
    return this.http.post<CurrentUser>(
      `${this.appConfig.BASE_URL}/users`,
      registerPayload
    );
  }

  login$(loginPayload: LoginRequest): Observable<CurrentUser> {
    return this.http.post<CurrentUser>(
      `${this.appConfig.BASE_URL}/users/login`,
      loginPayload
    );
  }
}
