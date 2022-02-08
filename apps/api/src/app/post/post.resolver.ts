import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post } from './post.model';
import { PostRepository } from './post.repository';
import { ParseIntPipe } from '@nestjs/common';
import { ProfileRepository } from '../profile/profile.repository';
import { Profile } from '../profile/profile.model';

@Resolver((of) => Post)
export class PostResolver {
  constructor(
    private postRepo: PostRepository,
    private profileRepo: ProfileRepository
  ) {}

  @ResolveField((returns) => String, { nullable: true })
  preview(@Parent() post: Post) {
    return (post.body || '')
      .split('\n')
      .filter((line) => line.trim().length > 0)[0];
  }

  @ResolveField((returns) => Profile)
  author(@Parent() post: Post & { authorId: number }) {
    return this.profileRepo.find(post.authorId);
  }

  @Query((returns) => [Post])
  posts() {
    return this.postRepo.all();
  }

  @Query((returns) => Post)
  post(@Args('id', { type: () => Int }) id: number) {
    return this.postRepo.find(id);
  }

  @Query((returns) => [Post])
  postsByAuthor(@Args('authorId', { type: () => Int }) authorId: number) {
    return this.postRepo.findByAuthor(authorId);
  }

  @Mutation((returns) => Post)
  addPost(
    @Args('authorId', { type: () => Int }, ParseIntPipe) authorId: number,
    @Args('title') title: string,
    @Args('body', { nullable: true }) body?: string
  ) {
    return this.postRepo.add({
      authorId,
      title: title,
      body: body || '',
    });
  }

  @Mutation((returns) => Post)
  updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('title') title: string,
    @Args('body', { nullable: true }) body?: string
  ) {
    return this.postRepo.replace({
      id,
      title,
      body: body || '',
    });
  }
}
