import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Post } from 'src/mongoose/schema/post.schema';
import { User } from 'src/mongoose/schema/user.schema';
import { PostDto } from './dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private postModel: mongoose.Model<Post>,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async create(userId: string, data: PostDto) {
    console.log(userId, data);
  }
  async findAll() {
    const allPosts = await this.postModel
      .find()
      .populate({
        path: 'postedby',
        select: {
          picture: 1,
          username: 1,
        },
      })
      .populate({
        path: 'comments',
        select: { comment: 1, createdAt: 1, commentby: 1 },
        options: {
          sort: {
            _id: -1,
          },
        },
        populate: {
          path: 'commentby',
          select: {
            _id: 1,
            picture: 1,
            username: 1,
          },
        },
      })
      .sort({ _id: -1 })
      .lean();
    return allPosts;
  }
  async findById(id: string) {
    const postById = await this.postModel
      .findById(id)
      .populate({
        path: 'postedby',
        select: {
          picture: 1,
          username: 1,
        },
      })
      .populate({
        path: 'comments',
        select: { comment: 1, createdAt: 1, commentby: 1 },
        options: {
          sort: {
            _id: -1,
          },
        },
        populate: {
          path: 'commentby',
          select: {
            _id: 1,
            picture: 1,
            username: 1,
          },
        },
      })
      .lean();
    return postById;
  }
}
