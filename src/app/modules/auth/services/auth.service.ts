import { CurrentUser } from '@auth/interfaces/current-user.interface';
import { Inject, Injectable } from '@angular/core';
import { PersistanceService } from '@services/persistance.service';
import { APP_SERVICE_CONFIG } from '@app/core/services/app-config.service';
import { AppConfig } from '@interfaces/app-config.interface';
import { AuthState } from '@auth/state/auth.state';

@Injectable()
export class AuthService {
  constructor(
    @Inject(APP_SERVICE_CONFIG) private appConfig: AppConfig,
    private persistanceService: PersistanceService,
    private authState: AuthState
  ) {}

  setToken(currentUser: CurrentUser): void {
    this.persistanceService.set(this.appConfig.TOKEN, currentUser.token);
  }

  logout(): void {
    this.persistanceService.remove(this.appConfig.TOKEN);
  }
}
