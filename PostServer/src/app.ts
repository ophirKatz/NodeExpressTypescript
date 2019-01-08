import * as express from 'express';
import * as bodyParser from 'body-parser';
import { NestFactory, NestApplication } from '@nestjs/core';
import * as mongoose from 'mongoose';

import { AppModule } from './module/app.module';
import { Consts } from './consts/Consts';


class App {
  public app: NestApplication;

  constructor() {
    this.connectToMongoDB();
    this.bootstrap();
  }

  private connectToMongoDB(): void {
    mongoose.connect(Consts.mongoDBUrl, { useNewUrlParser: true })
      .then(() => console.log('MongoDB Connected'))
      .catch(err => console.log(err));
  }

  private async bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(3000); // TODO : Move to configuration file
  }
}

export default new App().app;