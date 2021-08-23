import { BaseRepository } from '../base-repository';
import {Post} from '../graphql';

export class PostRepository extends BaseRepository<Post & {authorId: number}> {
  findByAuthor(authorId: number) {
    return this.entities.filter((post) => post.authorId === authorId);
  }
}
