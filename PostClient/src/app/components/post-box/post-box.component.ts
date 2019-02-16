import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/services/data/DataProvider';
import { PostModel } from '../../../../../PostCommon/src/model/PostModel';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-post-box',
  templateUrl: './post-box.component.html',
  styleUrls: ['./post-box.component.css']
})
export class PostBoxComponent implements OnInit {

  private emptyPost = { title: '', body: '' };
  private postInEdit: PostModel;

  private submitText = 'Add Post';
  private newPost = true;

  constructor(private readonly postsService: PostsService,
      private postProvider: DataProvider<PostModel>,
      private addedPost: DataProvider<PostModel>) {
    this.postInEdit = this.emptyPost;
  }

  ngOnInit() {
    this.postProvider.subscribe((post: PostModel) => {
      if (post != null) {
        this.postInEdit = post;
        this.submitText = 'Finish Editing';
        this.newPost = false;
      }
    });
  }

  private onPostAdded(post: PostModel) {
    // Add to list of posts in posts component - communicate post via another post provider
    console.log(post);
    this.addedPost.changeValue(post);
  }

  private onSubmitPost() {
    if (this.submitText === 'Add Post') {
      this.postsService.addNewPost(this.postInEdit)
        .subscribe(post => this.onPostAdded(post));
    } else {
      this.postsService.updatePost(this.postInEdit)
        .subscribe(post => this.postProvider.changeValue(this.postInEdit));
    }

    this.postInEdit = this.emptyPost;
  }

  private onKey() {
    // console.log(this.postInEdit);
  }

}
