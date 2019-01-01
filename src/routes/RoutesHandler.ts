import { Request, Response, NextFunction } from 'express';
import { PostController } from '../controllers/post.controller';
import { Routes } from './Routes';
import { IRouteHandler } from './IRoutesHandler';

export class RoutesHandler {

  private postController: PostController;

  constructor() {
    // this.postController = new PostController();
  }

  public configureRoutesForApplication(app): void {
    app.route('/')
      .get((_req: Request, res: Response) => {
        res.status(200).send({
          message: 'GET request successfull!'
        });
      });
    
    // Resources
    app.route(Routes.postRoute)
      // When this route is sent with a GET request...
      .get((req: Request) => {
        // Middleware actions
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
      }, this.postController.getPosts)
      // When this route is sent with a POST request...
      .post(this.postController.addNewPost);

    // Contact detail
    app.route(Routes.specificPostRoute)
      .get(this.postController.getPostById)
      .put(this.postController.updatePost)
      .delete(this.postController.deletePost)
  }
}