import { Module, forwardRef } from '@nestjs/common';
import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';
import { PostModule } from 'src/post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './dto/author.dto';

@Module({
  imports: [forwardRef(() => PostModule), TypeOrmModule.forFeature([Author])],
  providers: [AuthorResolver, AuthorService],
  exports: [AuthorService],
})
export class AuthorModule {}
