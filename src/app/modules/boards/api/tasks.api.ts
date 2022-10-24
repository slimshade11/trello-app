import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AppConfig } from '@interfaces/app-config.interface';
import { APP_SERVICE_CONFIG } from '@services/app-config.service';
import { Observable } from 'rxjs';
import { TaskCustom } from '@boards/interfaces/task-custom.interface';

@Injectable()
export class TasksApi {
  constructor(
    @Inject(APP_SERVICE_CONFIG) private appConfig: AppConfig,
    private http: HttpClient
  ) {}

  getTasks$(boardId: string): Observable<TaskCustom[]> {
    const endpoint: string = `${this.appConfig.BASE_URL}/boards/${boardId}/tasks`;
    return this.http.get<TaskCustom[]>(endpoint);
  }
}
