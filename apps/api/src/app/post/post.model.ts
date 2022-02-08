import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Profile } from '../profile/profile.model';

@ObjectType()
export class Post {
  @Field((type) => Int)
  id: number;
  @Field()
  title: string;
  @Field({ nullable: true })
  body: string;
  @Field((type) => Profile)
  author: Profile;
}
