import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddPostGQL } from '@graphql-state-spike/data-access';
import { map } from 'rxjs/operators';

const authorId = 1;

@Component({
  selector: 'graphql-state-spike-post-add',
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
    private fb: FormBuilder,
    private addPostMutation: AddPostGQL
  ) {}

  async onSubmit() {
    const { title, body } = this.form.value;
    const newPost = await this.addPostMutation
      .mutate({ title, body, authorId })
      .pipe(map((response) => response.data?.addPost))
      .toPromise();
    this.router.navigate(['/posts', newPost?.id]);
  }
}
