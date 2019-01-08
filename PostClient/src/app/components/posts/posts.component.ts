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

  constructor(private readonly postsService: PostsService) { }

  ngOnInit() {
    this.getPosts();
  }

  public getPosts() {
    this.postsService.getPosts().subscribe(
      (data: PostModel[]) => this.posts = data
    );
  }

}
