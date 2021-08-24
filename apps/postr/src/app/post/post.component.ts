import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostGQL } from '@graphql-state-spike/data-access';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'graphql-state-spike-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  readonly post$ = this.route.data.pipe(
    switchMap(({ id }) =>
      this.postQuery
        .watch({ id })
        .valueChanges.pipe(map((result) => result.data.post))
    )
  );

  constructor(private route: ActivatedRoute, private postQuery: PostGQL) {}
}
