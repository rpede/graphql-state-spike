import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileGQL, UpdateProfileGQL } from '@graphql-state-spike/data-access';
import { Subscription, Observable } from 'rxjs';
import { switchMap, shareReplay, pluck, map, take } from 'rxjs/operators';

type Profile = {
  id: number;
  firstName: string;
  lastName: string;
};

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

  loading$?: Observable<boolean>;
  profile$?: Observable<Profile>;
  private subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private profileQuery: ProfileGQL,
    private updateProfileMutation: UpdateProfileGQL
  ) {}

  ngOnInit(): void {
    const source$ = this.getProfile();

    this.loading$ = source$.pipe(map((q) => q.loading));
    this.profile$ = source$.pipe(map((q) => q.data?.profile as Profile));

    this.subscription = this.profile$.subscribe(({ firstName, lastName }) => {
      this.form.setValue({ firstName, lastName });
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
    await this.updateProfile(firstName, lastName);
  }

  private async updateProfile(firstName: string, lastName: string) {
    const { id } = (await this.profile$?.pipe(take(1)).toPromise()) as Profile;
    return this.updateProfileMutation
      .mutate({ id, firstName, lastName })
      .toPromise();
  }

  private getProfile() {
    return this.route.data.pipe(
      switchMap(({ id }) => this.profileQuery.watch({ id }).valueChanges),
      shareReplay(1)
    );
  }
}
