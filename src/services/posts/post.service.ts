import { Injectable } from '@nestjs/common';

require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');

import * as mongoose from 'mongoose';

import { PostModel } from '../../model/PostModel';
import { PostSchema } from '../../schema/PostSchema';

import { Consts } from '../../consts/Consts';

const Post = mongoose.model('posts', PostSchema);

@Injectable()
export class PostService {
  public addNewPost(post: PostModel) {
    let newPost = new Post(post);
		
    newPost.save();
  }

  public getPosts(): Promise<mongoose.Document[]> {
    return Post.find({}).exec();
  }

  public getPostById(postId: string) {           
    return Post.findById(postId).exec();
  }

  public updatePost(postId: string, updatedPost: PostModel) {
    return Post.findOneAndUpdate({ _id: postId }, updatedPost, { new: true }).exec();
  }

  public deletePost(postId: string) {
    return Post.remove({ _id: postId }).exec();
  }

  public savePostsFromJsonPlaceHolder(): string {
    fetch(Consts.jsonPlaceHolderUrl)
      .then(response => response.json())
      .then(posts => {
        posts.forEach(post => {
          let schemaPost = new Post(post);

          schemaPost.save();
        });
      });
      return 'ok';
  }
}