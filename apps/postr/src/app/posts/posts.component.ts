import { Component } from '@angular/core';
import { PostsGQL } from '@graphql-state-spike/data-access';
import { map } from 'rxjs/operators';

@Component({
  selector: 'postr-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {
  readonly posts$ = this.postsQuery
    .watch()
    .valueChanges.pipe(map((result) => result.data.posts));

  constructor(private postsQuery: PostsGQL) {}
}
