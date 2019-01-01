import * as express from 'express';

export interface IRouteHandler<> {

  configureRoutesForApplication(app: express.Application): void;

}