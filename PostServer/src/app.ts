import * as express from 'express';
import * as bodyParser from 'body-parser';
import { NestFactory, NestApplication } from '@nestjs/core';
import * as mongoose from 'mongoose';

import { AppModule } from './module/app.module';
import { Consts } from './consts/Consts';


class App {
  public app: NestApplication;
  // public routesHandler: IRouteHandler = new RoutesHandler();

  constructor() {
    // this.app = express();
    // this.config();        
    // this.routesHandler.configureRoutesForApplication(this.app);
    this.connectToMongoDB();
    this.bootstrap();
  }

  private connectToMongoDB(): void {
    mongoose.connect(Consts.mongoDBUrl)
      .then(() => console.log('MongoDB Connected'))
      .catch(err => console.log(err));
  }

  private async bootstrap() {
    const app = await NestFactory.create(AppModule);
    // app.setViewEngine('hbs');
    await app.listen(3000);
  }

  // private config(): void {
  //   this.app.use(bodyParser.json());
  //   this.app.use(bodyParser.urlencoded({ extended: false }));
  // }
}

export default new App().app;