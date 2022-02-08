import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ProfileResolver } from './profile/profile.resolver';
import { ProfileRepository } from './profile/profile.repository';
import { PostResolver } from './post/post.resolver';
import { PostRepository } from './post/post.repository';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      sortSchema: true,
    }),
  ],
  providers: [
    ProfileResolver,
    ProfileRepository,
    PostResolver,
    PostRepository,
    {
      provide: PrismaService.name,
      useClass: PrismaService,
    },
  ],
})
export class AppModule {}
