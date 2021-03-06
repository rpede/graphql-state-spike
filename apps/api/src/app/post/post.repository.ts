import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { BaseRepository } from '../base-repository';

@Injectable()
export class PostRepository extends BaseRepository<Post> {
  protected get delegate() {
    return this.prisma.post;
  }

  findByAuthor(authorId: number) {
    return this.delegate.findMany({ where: { authorId } });
  }
}
