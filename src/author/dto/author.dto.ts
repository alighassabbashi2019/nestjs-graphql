import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';
import { Post } from 'src/post/dto/post.dto';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  @IsUUID()
  id: string;

  @Column()
  @Field()
  @IsString()
  name: string;

  @OneToMany((type) => Post, (post) => post.author)
  @Field((type) => [Post], {})
  posts: Post[];
}

@InputType()
export class CreateAuthorInput {
  @Field()
  @IsString()
  name: string;
}
