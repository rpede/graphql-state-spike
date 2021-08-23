import { ParseIntPipe } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfileRepository } from './profile.repository';

@Resolver('Profile')
export class ProfileResolver {
  constructor(private profileRepo: ProfileRepository) {}

  @Query('profile')
  getProfile(@Args('id', ParseIntPipe) id: number) {
    return this.profileRepo.find(id);
  }

  @Mutation('updateProfile')
  updateProfile(
    @Args('id', ParseIntPipe) id: number,
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string
  ) {
    return this.profileRepo.replace({
      ...this.profileRepo.find(id),
      firstName,
      lastName,
    });
  }
}
