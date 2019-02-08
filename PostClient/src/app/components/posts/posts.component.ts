import { Component, OnInit } from '@angular/core';

import { PostModel } from '../../../../../PostCommon/src/model/PostModel';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  private posts: PostModel[];

  private showPosts: boolean;

  private spinnerVisible: boolean;

  constructor(private readonly postsService: PostsService) { }

  ngOnInit() {
    this.showPosts = false;
    this.spinnerVisible = false;
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

}
