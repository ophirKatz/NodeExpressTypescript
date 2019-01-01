import { Injectable } from '@nestjs/common';

import * as mongoose from 'mongoose';

import { PostModel } from '../model/PostModel';
import { ResultCallback, ErrorCallback } from '../model/Callback';
import { PostSchema } from '../schema/PostSchema';

import { Consts } from '../consts/consts';

const Post = mongoose.model('posts', PostSchema);

@Injectable()
export class PostService {
  public addNewPost(post: PostModel, callback: ResultCallback) {                
    let newPost = new Post(post);
		
    newPost.save(callback);
  }

  public getPosts(callback: ResultCallback) {
    Post.find({}, callback);
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

  public getPostById(postId: mongoose.Types.ObjectId, callback: ResultCallback) {           
    Post.findById(postId, callback);
  }

  public updatePost(postId: mongoose.Types.ObjectId, updatedPost: PostModel, callback: ResultCallback) {
    Post.findOneAndUpdate({ _id: postId }, updatedPost, { new: true }, callback);
  }

  public deletePost(postId: mongoose.Types.ObjectId, callback: ErrorCallback) {           
    Post.remove({ _id: postId }, callback);
  }
}