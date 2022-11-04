import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AppConfig } from '@interfaces/app-config.interface';
import { APP_SERVICE_CONFIG } from '@services/app-config.service';
import { Observable } from 'rxjs';
import { Column } from '@boards/interfaces/column.interface';

@Injectable()
export class ColumnsApi {
    constructor(
        @Inject(APP_SERVICE_CONFIG) private appConfig: AppConfig,
        private http: HttpClient
    ) {}

    loadColumns$(boardId: string): Observable<Column[]> {
        return this.http.get<Column[]>(`${this.appConfig.BASE_URL}/boards/${boardId}/columns`);
    }
}
