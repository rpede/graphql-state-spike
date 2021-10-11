import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddPostGQL } from '@postr/data-access';
import { map, pluck, switchMap } from 'rxjs/operators';

@Component({
  selector: 'postr-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss'],
})
export class PostAddComponent {
  readonly form = this.fb.group({
    title: ['', Validators.required],
    body: [''],
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private addPostMutation: AddPostGQL
  ) {}

  async onSubmit() {
    const { title, body } = this.form.value;
    const newPost = await this.route.data.pipe(
      pluck('authorId'),
      switchMap((authorId) =>
        this.addPostMutation.mutate({ title, body, authorId })
      ),
      map((response) => response.data?.addPost)
    ).toPromise();
    this.router.navigate(['/posts', newPost?.id]);
  }
}
