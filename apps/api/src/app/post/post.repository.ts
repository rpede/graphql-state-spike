import { BaseRepository } from '../base-repository';
import { Post } from '../graphql';

export class PostRepository extends BaseRepository<
  Post & { authorId: number }
> {
  constructor() {
    super();
    this.add({
      id: 0,
      title: 'Hello world',
      body: `
Earum quasi et accusantium officia velit vitae fugit. Et rem id et molestias ut. Sint quasi illo quisquam quaerat excepturi.

Sit esse voluptatem quis ea. Optio libero tempore et eveniet quam eaque qui porro. Reiciendis aut inventore delectus repudiandae numquam sapiente reiciendis.

Nihil occaecati ex sit enim nulla cumque id. Sint rerum eaque molestiae necessitatibus ipsa nihil ea. Nihil sed voluptas accusamus quibusdam.

Magnam sequi ab itaque sint ut. Quos tempore sit veritatis maxime aut totam. Perspiciatis voluptatem rerum quis laborum vel occaecati. Laboriosam quia odio suscipit blanditiis. Ut non voluptas earum omnis.

Amet rem sed qui aut fugit sit recusandae. Et quia quia omnis minus maxime reiciendis aut. Reiciendis vitae unde tempore nihil nobis suscipit dolores provident.
      `,
      authorId: 0,
      author: null,
    });
    this.add({
      id: 1,
      title: 'Another amazing post',
      authorId: 0,
      author: null,
    });
    this.add({
      id: 2,
      title: 'Ich habe kein geld',
      authorId: 1,
      author: null,
    });
  }

  findByAuthor(authorId: number) {
    return this.entities.filter((post) => post.authorId === authorId);
  }
}
