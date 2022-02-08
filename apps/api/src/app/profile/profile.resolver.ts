import { ParseIntPipe } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import { Post } from '../post/post.model';
import { Profile } from './profile.model';
import { ProfileRepository } from './profile.repository';
import { PostRepository } from '../post/post.repository';

@Resolver((of) => Profile)
export class ProfileResolver {
  constructor(
    private profileRepo: ProfileRepository,
    private postRepo: PostRepository
  ) {}

  @ResolveField((returns) => String)
  fullName(@Parent() profile: Profile) {
    const { firstName, lastName } = profile;
    return `${firstName} ${lastName}`;
  }

  @ResolveField((returns) => [Post])
  posts(@Parent() profile: Profile) {
    return this.postRepo.findByAuthor(profile.id);
  }

  @Query((returns) => Profile)
  profile(@Args({ name: 'id', type: () => Int }, ParseIntPipe) id: number) {
    return this.profileRepo.find(id);
  }

  @Mutation((returns) => Profile)
  async updateProfile(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string
  ) {
    const profile = await this.profileRepo.find(id);
    return this.profileRepo.replace({
      ...profile,
      firstName,
      lastName,
    });
  }
}
