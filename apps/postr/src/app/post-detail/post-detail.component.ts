import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostGQL } from '@postr/data-access';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'postr-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent {
  readonly post$ = this.route.data.pipe(
    switchMap(({ id }) =>
      this.postQuery
        .watch({ id })
        .valueChanges.pipe(map((result) => result.data.post))
    )
  );

  constructor(private route: ActivatedRoute, private postQuery: PostGQL) {}
}
