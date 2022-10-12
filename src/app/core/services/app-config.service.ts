import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppConfig } from '@interfaces/app-config.interface';
import { Config } from '@enums/config.enum';

export const APP_SERVICE_CONFIG: InjectionToken<AppConfig> =
  new InjectionToken<AppConfig>(Config.APP_CONFIG);

export const APP_CONFIG: AppConfig = {
  BASE_URL: environment.baseUrl,
  TOKEN: Config.TOKEN,
};
