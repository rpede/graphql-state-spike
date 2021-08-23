import { BaseRepository } from '../base-repository';
import {Post} from '../graphql';

export class PostRepository extends BaseRepository<Post & {authorId: number}> {
  constructor() {
    super();
    this.add({
      id: 0,
      title: 'Hello world',
      authorId: 0,
      author: null
    });
    this.add({
      id: 1,
      title: 'Another amazing post',
      authorId: 0,
      author: null
    });
    this.add({
      id: 2,
      title: 'Ich habe kein geld',
      authorId: 1,
      author: null
    });
  }

  findByAuthor(authorId: number) {
    return this.entities.filter((post) => post.authorId === authorId);
  }
}
