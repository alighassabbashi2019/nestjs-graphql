import { Module, forwardRef } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { AuthorModule } from 'src/author/author.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './dto/post.dto';

@Module({
  imports: [forwardRef(() => AuthorModule), TypeOrmModule.forFeature([Post])],
  providers: [PostResolver, PostService],
  exports: [PostService],
})
export class PostModule {}
