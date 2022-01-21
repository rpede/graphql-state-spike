import { Injectable } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { BaseRepository } from '../base-repository';

@Injectable()
export class ProfileRepository extends BaseRepository<Profile> {
  protected get delegate() {
    return this.prisma.profile;
  }
}
