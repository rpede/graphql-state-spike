import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { ProfileResolver } from './profile/profile.resolver';
import { ProfileRepository } from './profile/profile.repository';
import { PostResolver } from './post/post.resolver';
import { PostAuthorResolver } from './post/post-author.resolver';
import { ProfilePostResolver } from './profile/profile-posts.resolver';
import { PostRepository } from './post/post.repository';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/app/graphql.ts'),
      },
    }),
  ],
  providers: [
    ProfileResolver,
    ProfileRepository,
    PostAuthorResolver,
    PostResolver,
    PostRepository,
    ProfilePostResolver
  ],
})
export class AppModule {}
