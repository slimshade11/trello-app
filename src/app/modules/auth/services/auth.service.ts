import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUser } from '../interfaces/current-user.interface';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getCurrentUser$(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(`${env.baseUrl}/user`);
  }
}
