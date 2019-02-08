import { isDevMode } from '@angular/core';

const configFile = require('./config/config.json');
// import * as config from 'config';

class AppConfig {
  public static applicationMode: string;
  private static instance: AppConfig;

  public finalConfig: any;

  public static Instance(): AppConfig {
    if (AppConfig.instance == null) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }

  //#region Server Config Logic
  private constructor() {
    AppConfig.applicationMode = isDevMode() ? 'devConfig' : 'prodConfig';

    if (isDevMode()) {
      this.finalConfig = configFile.devConfig;
    } else {
      this.finalConfig = configFile.prodConfig;
    }
    console.log(this.finalConfig.ServerAddress);
  }

  public getFinalConfig(): any {
    return this.finalConfig;
  }

  //#endregion
}

export const config = AppConfig.Instance().finalConfig;

