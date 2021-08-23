import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostRepository } from './post.repository';

@Resolver('Post')
export class PostResolver {
  constructor(private repository: PostRepository) { }

  @Query('posts')
  getPosts() {
    return this.repository.all();
  }

  @Query('post')
  getPost(@Args('id') id: number) {
    return this.repository.find(id);
  }

  @Query('postsByAuthor')
  getPostByAuthor(@Args('authorId') authorId: number) {
    return this.repository.findByAuthor(authorId);
  }

  @Mutation('addPost')
  addPost(
    @Args('authorId') authorId: number,
    @Args('title') title: string,
    @Args('body') body?: string
  ) {
    return this.repository.add({
      id: this.repository.count(),
      authorId,
      author: null,
      title: title,
      body: body || '',
    });
  }

  @Mutation('updatePost')
  updatePost(
    @Args('id') id: number,
    @Args('title') title: string,
    @Args('body') body?: string
  ) {
    return this.repository.replace({
      ...this.repository.find(id),
      title,
      body: body || ''
    })
  }
}
