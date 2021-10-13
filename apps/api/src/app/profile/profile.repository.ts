import { Injectable } from '@nestjs/common';
import { Profile } from '@postr/models';
import { BaseRepository } from '../base-repository';

@Injectable()
export class ProfileRepository extends BaseRepository<Profile> {
  protected get delegate() {
    return this.prisma.profile;
  }
}
