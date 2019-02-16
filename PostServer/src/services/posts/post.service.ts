import { Injectable } from '@nestjs/common';

require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');

import * as mongoose from 'mongoose';

import { PostModel } from '../../../../PostCommon/src/model/PostModel';
import { PostSchema } from '../../schema/PostSchema';

import { Consts } from '../../consts/Consts';

const Post = mongoose.model('posts', PostSchema);

@Injectable()
export class PostService {
  public addNewPost(post: PostModel): Promise<mongoose.Document> {
    let newPost = new Post(post);
    console.log('Saving new post...');
		
    return newPost.save();
  }

  public getPosts(): Promise<mongoose.Document[]> {
    return Post.find({}).exec();
  }

  public getPostById(postId: string) {           
    return Post.findById(postId).exec();
  }

  public updatePost(postId: string, updatedPost: PostModel) {
    console.log(`Update post with id = ${postId}...`);
    return Post.findOneAndUpdate({ _id: postId }, updatedPost, { new: true }).exec();
  }

  public deletePost(postId: string) {
    return Post.remove({ _id: postId }).exec();
  }

  public savePostsFromJsonPlaceHolder(): string {
    fetch(Consts.jsonPlaceHolderUrl)
      .then(response => response.json())
      .then(posts => {
        posts.slice(0, 5).forEach(post => {
          let schemaPost = new Post(post);

          schemaPost.save();
        });
      });
      return 'ok';
  }

  public deleteAllPosts() {
    Post.deleteMany({}).exec();
  }
}