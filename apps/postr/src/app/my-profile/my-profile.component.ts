import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileGQL } from '@graphql-state-spike/data-access';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'postr-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent  {
  readonly profile$ = this.route.data.pipe(
    switchMap(({ id }) =>
      this.profileQuery
        .watch({ id })
        .valueChanges.pipe(map((result) => result.data.profile))
    )
  );

  constructor(
    private route: ActivatedRoute,
    private profileQuery: ProfileGQL
  ) {}
}
