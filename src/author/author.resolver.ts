import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Author, CreateAuthorInput } from './dto/author.dto';
import { Query } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { PostService } from 'src/post/post.service';
import { Post } from 'src/post/dto/post.dto';

@Resolver((of) => Author)
export class AuthorResolver {
  constructor(
    private readonly _authorService: AuthorService,
    private readonly _postService: PostService,
  ) {}

  @Query((returns) => [Author], { name: 'authors' })
  async getAuthors() {
    return this._authorService.findAllAuthors();
  }

  @Query((returns) => Author, { name: 'author' })
  async getAuthor(@Args('id') id: string) {
    return this._authorService.findById(id);
  }

  @ResolveField((returns) => [Post], { name: 'posts' })
  async getAuthorPosts(@Parent() author: Author) {
    const { id } = author;
    return this._postService.findAuthorPosts(id);
  }

  @Mutation((returns) => Author, { name: 'author' })
  async createAuthor(@Args('body') body: CreateAuthorInput) {
    return this._authorService.create(body);
  }
}
