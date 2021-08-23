import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Post } from "../graphql";
import { ProfileRepository } from "../profile/profile.repository";

@Resolver('Post')
export class PostAuthorResolver {
  constructor(private profileRepo: ProfileRepository) {
  }

  @ResolveField()
  author(@Parent() post: Post & { authorId: number }) {
    return this.profileRepo.find(post.authorId);
  }
}
