import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileGQL, UpdateProfileGQL } from '@graphql-state-spike/data-access';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'postr-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit, OnDestroy {
  readonly form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });
  private id?: number;
  private subscription?: Subscription;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private profileQuery: ProfileGQL,
    private updateProfile: UpdateProfileGQL
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.data
      .pipe(switchMap(({ id }) => this.profileQuery.watch({ id }).valueChanges))
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        if (data?.profile) {
          const { id, firstName, lastName } = data.profile;
          this.id = id;
          this.form.setValue({ firstName, lastName });
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  async onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const { firstName, lastName } = this.form.value;
    return this.updateProfile.mutate({
      id: this.id as number,
      firstName,
      lastName,
    }).toPromise();
  }
}
