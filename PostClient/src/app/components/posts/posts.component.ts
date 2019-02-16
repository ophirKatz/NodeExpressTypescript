import { Component, OnInit } from '@angular/core';

import { PostModel } from '../../../../../PostCommon/src/model/PostModel';
import { PostsService } from 'src/app/services/posts/posts.service';
import { DataProvider } from 'src/app/services/data/DataProvider';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  private posts: PostModel[];

  private showPosts: boolean;

  private spinnerVisible: boolean;

  public constructor(private readonly postsService: PostsService,
      private readonly postProvider: DataProvider<PostModel>,
      private addedPost: DataProvider<PostModel>) {
    this.addedPost.subscribe(post => this.addNewPostInUI(post));
  }

  private addNewPostInUI(post: PostModel): void {
    // After saving the post in the DB, we want to just simply add the post to the UI list
    if (this.posts == null || this.posts === undefined || post == null) { return; }
    console.log(post);
    this.posts.push(post);
  }

  ngOnInit() {
    this.postProvider.subscribe(post => this.updatePostInUI(post));
    this.showPosts = false;
    this.spinnerVisible = false;
    this.posts = [];
  }

  public getPosts(): void {
    this.showSpinner();
    this.showPosts = true;
    this.postsService.getPosts().subscribe(
      (data: PostModel[]) => {
        console.log('Data arrived: ', data);
        this.posts = data;
        this.hideSpinner();
      }
    );
  }

  private showSpinner(): void {
    this.spinnerVisible = true;
  }

  private hideSpinner(): void {
    this.spinnerVisible = false;
  }

  public onEditPost(post: PostModel) {
    console.log('edit post');
    this.postProvider.changeValue(post);
  }

  private updatePostInUI(updatedPost: PostModel): void {
    if (this.posts == null || this.posts === undefined) { return; }
    this.posts.forEach(post => {
      if (post._id === updatedPost._id) {
        post.title = updatedPost.title;
        post.body = updatedPost.body;
        return;
      }
    });
  }

}
