import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author, CreateAuthorInput } from './dto/author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private readonly _authorRepo: Repository<Author>,
  ) {}

  async findAllAuthors(): Promise<Author[]> {
    console.log(await this._authorRepo.find());

    return this._authorRepo.find();
  }

  async findById(id: string): Promise<Author> {
    return this._authorRepo.findOne({ where: { id } });
  }

  async create(body: CreateAuthorInput) {
    const createdAuthor = this._authorRepo.create(body);
    return this._authorRepo.save(createdAuthor);
  }
}
