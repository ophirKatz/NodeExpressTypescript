import { Component } from '@angular/core';
import { PostsService } from './services/posts/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PostClient';

  constructor(private readonly postsService: PostsService) {

  }

  private reset() {
    console.log('reset called');
    this.postsService.deleteAllPosts();
  }
}
