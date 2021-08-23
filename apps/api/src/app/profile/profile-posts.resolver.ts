import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Profile } from '../graphql';
import { PostRepository } from '../post/post.repository';

@Resolver('Profile')
export class ProfilePostResolver {
  constructor(private postRepo: PostRepository) {}

  @ResolveField('posts')
  posts(@Parent() profile: Profile) {
    return this.postRepo.findByAuthor(profile.id);
  }
}
