import { Module } from '@nestjs/common';
import { PostController } from '../services/posts/post.controller';
import { PostService } from '../services/posts/post.service';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService]
})
export class AppModule {}
