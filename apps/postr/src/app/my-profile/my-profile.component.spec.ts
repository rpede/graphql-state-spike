import {
  ComponentFixtureAutoDetect,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { MyProfileComponent } from './my-profile.component';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  ProfileDocument,
  UpdateProfileDocument,
} from '@graphql-state-spike/data-access';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { FormTestingModule } from '../__tests__/form-testing.module';
import { createComponentFixture } from '../__tests__/component-test.helpers';

// Using component harnesses is an alternative.
// See: https://material.angular.io/guide/using-component-harnesses

describe('MyProfileComponent', () => {
  const profileId = 1;

  let controller: ApolloTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyProfileComponent],
      imports: [
        ApolloTestingModule,
        LayoutModule,
        FormTestingModule,
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: ActivatedRoute, useValue: { data: of({ id: profileId }) } },
      ],
    }).compileComponents();

    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should query profile', () => {
    createSUT();

    const op = controller.expectOne(ProfileDocument);
    expect(op.operation.variables.id).toBe(profileId);
  });

  it('should set input values from profile', fakeAsync(() => {
    const { element } = createSUT();
    mockProfileQuery('Joe', 'Doe');
    tick();

    expect(element('#firstName').value).toEqual('Joe');
    expect(element('#lastName').value).toEqual('Doe');
  }));

  describe('change and submit', () => {
    it('should call update profile mutation with changes', fakeAsync(() => {
      const { element } = createSUT();
      mockProfileQuery('Joe', 'Doe');
      tick();

      setInputValue(element('#firstName'), 'Alice');
      setInputValue(element('#lastName'), 'Smith');
      element('#submit').click();
      tick();

      const op = controller.expectOne(UpdateProfileDocument);
      expect(op.operation.variables).toEqual(buildProfile('Alice', 'Smith'));
    }));
  });

  function createSUT() {
    return createComponentFixture(MyProfileComponent);
  }

  function mockProfileQuery(firstName: string, lastName: string) {
    const profile = buildProfile(firstName, lastName);
    controller.expectOne(ProfileDocument).flushData({ profile });
  }

  function buildProfile(firstName: string, lastName: string) {
    return {
      id: profileId,
      firstName,
      lastName,
    };
  }

  function setInputValue(input: Element & { value: string }, value: string) {
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }
});
