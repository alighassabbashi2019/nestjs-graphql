import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostInput, Post, UpdatePostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly _postRepo: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this._postRepo.find();
  }

  async findPost(id: string): Promise<Post> {
    return this._postRepo.findOne({ where: { id } });
  }

  async findAuthorPosts(id: string): Promise<Post[]> {
    return this._postRepo.find({ where: { authorId: id } });
  }

  async create(body: CreatePostInput): Promise<Post> {
    const createPost = this._postRepo.create(body);
    return this._postRepo.save(createPost);
  }
}
