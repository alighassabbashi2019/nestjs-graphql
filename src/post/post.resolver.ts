import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { AuthorService } from 'src/author/author.service';
import { CreatePostInput, Post, UpdatePostDto } from './dto/post.dto';
import { Inject, forwardRef } from '@nestjs/common';
import { AuthorResolver } from 'src/author/author.resolver';
import { Author } from 'src/author/dto/author.dto';

@Resolver((of) => Post)
export class PostResolver {
  constructor(
    private readonly _postService: PostService,
    private readonly _authorService: AuthorService,
  ) {}

  @Query((returns) => [Post], { name: 'posts' })
  getAllPosts() {
    return this._postService.findAll();
  }

  @Query((returns) => Post, { name: 'post' })
  getPost(@Args('id') id: string) {
    this._postService.findPost(id);
  }

  @ResolveField((returns) => Author, { name: 'author' })
  async getPostAuthor(@Parent() post: Post) {
    const { authorId } = post;
    return this._authorService.findById(authorId);
  }

  @Mutation((returns) => Post, { name: 'post' })
  async createPost(@Args('body') body: CreatePostInput): Promise<Post> {
    return this._postService.create(body);
  }
}
