import { Component } from '@angular/core';
import { PostsGQL } from '@graphql-state-spike/data-access';
import { map } from 'rxjs/operators';

@Component({
  selector: 'postr-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {
  readonly posts$ = this.postsQuery
    .watch()
    .valueChanges.pipe(map((result) => result.data.posts));

  constructor(private postsQuery: PostsGQL) {}
}
