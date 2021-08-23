import { Injectable } from '@nestjs/common';
import { Profile } from '../graphql';
import { BaseRepository } from '../base-repository';

@Injectable()
export class ProfileRepository extends BaseRepository<Profile> {
  constructor() {
    super();
    this.add({
      id: 0,
      firstName: 'Joe',
      lastName: 'Doe',
      fullName: null,
      posts: null,
    });
    this.add({
      id: 1,
      firstName: 'Alice',
      lastName: 'Smith',
      fullName: null,
      posts: null
    });
  }
}
