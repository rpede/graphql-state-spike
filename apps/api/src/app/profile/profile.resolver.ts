import { ParseIntPipe } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Profile } from '../graphql';
import { ProfileRepository } from './profile.repository';

@Resolver('Profile')
export class ProfileResolver {
  constructor(private profileRepo: ProfileRepository) {}

  @ResolveField()
  fullName(@Parent() profile: Profile) {
    const {firstName, lastName} = profile;
    return `${firstName} ${lastName}`;
  }

  @Query('profile')
  getProfile(@Args('id', ParseIntPipe) id: number) {
    return this.profileRepo.find(id);
  }

  @Mutation('updateProfile')
  async updateProfile(
    @Args('id', ParseIntPipe) id: number,
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
