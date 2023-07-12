import {
  Field,
  InputType,
  Int,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { IsNumber, IsString, IsUUID, MinLength } from 'class-validator';
import { Author } from 'src/author/dto/author.dto';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  @IsUUID()
  id: string;

  @Column()
  @Field()
  @IsString()
  @MinLength(8)
  title: string;

  @Column()
  @IsNumber()
  @Field((type) => Int, { nullable: true })
  votes?: number;

  @Column()
  @IsUUID()
  @Field()
  authorId: string;

  @ManyToOne((type) => Author, (author) => author.posts)
  @Field((type) => Author)
  author: Author;
}

@InputType()
export class CreatePostInput extends OmitType(
  Post,
  ['id', 'author'] as const,
  InputType,
) {}

@InputType()
export class UpdatePostDto extends PartialType(CreatePostInput) {}
