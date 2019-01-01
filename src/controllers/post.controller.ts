import { Get, Controller, Post, Put, Delete } from '@nestjs/common';
import { Request, Response } from 'express';
import { PostModel } from '../model/PostModel';
import { PostService } from '../services/post.service';

@Controller()
export class PostController {

	private _postService: PostService;

	constructor(private readonly postService: PostService) {
		this._postService = postService;
	}

	@Get('/savePosts')
	public savePostsFromJsonPlaceHolder() {
		this._postService.savePostsFromJsonPlaceHolder();
	}

	@Post('/post')
  public addNewPost(req: Request, res: Response) {
		let newPost: PostModel = req.body;
		this._postService.addNewPost(newPost, (err, post) => {
			if (err) {
				// res.send(err);
				return;
			}   
			return post;
		});
  }

	@Get('/post')
  public getPosts(req: Request, res: Response) {
		// this._postService.getPosts((err, posts) => {
		// 	if (err) {
		// 		res.send(err);
		// 	}
		// 	res.json(posts);
		// });
		return 'Hi Ophir';
  }

	@Get('/post/:postId')
  public getPostById(req: Request, res: Response) {
		this._postService.getPostById(req.params.postId, (err, post) => {
			if (err) {
				res.send(err);
			}
			res.json(post);
    });
  }

	@Put('/post/:postId')
  public updatePost(req: Request, res: Response) {
		let updatedPost: PostModel = req.body;
		this._postService.updatePost(req.params.postId, updatedPost, (err, post) => {
			if (err) {
				res.send(err);
			}
			res.json(post);
    });
  }

	@Delete('/post/:postId')
  public deletePost(req: Request, res: Response) {
		this._postService.deletePost(req.params.postId, (err) => {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'Successfully deleted post!' });
    });
  }
}