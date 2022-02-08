import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '../post/post.model';

@ObjectType()
export class Profile {
  @Field((type) => Int)
  id: number;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field((type) => [Post])
  posts: Post[];
}
