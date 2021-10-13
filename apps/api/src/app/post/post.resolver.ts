import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post } from '../graphql';
import { PostRepository } from './post.repository';

@Resolver('Post')
export class PostResolver {
  constructor(private repository: PostRepository) {}

  @ResolveField()
  preview(@Parent() post: Post) {
    return (post.body || '')
      .split('\n')
      .filter((line) => line.trim().length > 0)[0];
  }

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
      authorId,
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
      id,
      title,
      body: body || '',
    });
  }
}
