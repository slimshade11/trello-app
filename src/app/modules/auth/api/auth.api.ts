import { environment as env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUser } from '@auth/interfaces/current-user.interface';

@Injectable()
export class AuthApi {
  constructor(private http: HttpClient) {}

  loadCurrentUser$(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(`${env.baseUrl}/user`);
  }
}
