import { Get, Controller, Post, Put, Delete, Body, Header, Query } from '@nestjs/common';
import { PostModel } from '../../model/PostModel';
import { PostService } from './post.service';
import { Consts } from '../../consts/Consts';
import { Routes } from '../../consts/Routes';

@Controller()
export class PostController {

	constructor(private readonly postService: PostService) {}

	@Get(Routes.savePosts)
	public savePostsFromJsonPlaceHolder() {
		this.postService.savePostsFromJsonPlaceHolder();
	}

	@Post(Routes.addNewPost)
	@Header('Content-Type', Consts.applicationJson)
  public addNewPost(@Body() newPost: PostModel) {
		this.postService.addNewPost(newPost);
  }

	@Get(Routes.getPosts)
	@Header('Content-Type', Consts.applicationJson)
  public async getPosts() {
		return await this.postService.getPosts();
  }

	@Get(Routes.getPost)
	@Header('Content-Type', Consts.applicationJson)
  public async getPostById(@Query('postId') postId: string) {
		return await this.postService.getPostById(postId);
  }

	@Put(Routes.updatePost)
	@Header('Content-Type', Consts.applicationJson)
  public async updatePost(@Query('postId') postId: string, @Body() updatedPost: PostModel) {
		return await this.postService.updatePost(postId, updatedPost);
  }

	@Delete(Routes.deletePost)
  public async deletePost(@Query('postId') postId: string) {
		await this.postService.deletePost(postId);
		return 'Post deleted successfully!';
  }
}