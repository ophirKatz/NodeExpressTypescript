import { Get, Controller, Post, Put, Delete, Param, Body, Header } from '@nestjs/common';
import { PostModel } from '../../model/PostModel';
import { PostService } from './post.service';

@Controller()
export class PostController {

	constructor(private readonly postService: PostService) {}

	@Get('/savePosts')
	public savePostsFromJsonPlaceHolder() {
		this.postService.savePostsFromJsonPlaceHolder();
	}

	@Post('/new-post')
	@Header('Content-Type', 'application/json')
  public addNewPost(@Body() body) {
		let newPost: PostModel = body;
		this.postService.addNewPost(newPost);
  }

	@Get('/posts')
	@Header('Content-Type', 'application/json')
  public async getPosts() {
		return await this.postService.getPosts();
  }

	@Get('/post/:postId')
	@Header('Content-Type', 'application/json')
  public async getPostById(@Param('postId') postId: string) {
		return await this.postService.getPostById(postId);
  }

	@Put('/update-post/:postId')
	@Header('Content-Type', 'application/json')
  public async updatePost(@Param('postId') postId: string, @Body() body) {
		let updatedPost: PostModel = body;
		return await this.postService.updatePost(postId, updatedPost);
  }

	@Delete('/delete-post/:postId')
  public async deletePost(@Param('postId') postId: string) {
		await this.postService.deletePost(postId);
		return 'Post deleted successfully!';
  }
}