import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_SERVICE_CONFIG } from '@services/app-config.service';
import { AppConfig } from '@interfaces/app-config.interface';
import { Board } from '@boards/interfaces/board.interface';

@Injectable({
  providedIn: 'root',
})
export class BoardsApi {
  constructor(
    @Inject(APP_SERVICE_CONFIG) private appConfig: AppConfig,
    private http: HttpClient
  ) {}

  loadBoards$(): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.appConfig.BASE_URL}/boards`);
  }
}
