import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PostAddComponent } from './post-add.component';
import { FormTestingModule } from '../__tests__/form-testing.module';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { createComponentFixture, setInputValue } from '../__tests__/component-test.helpers';
import { AddPostDocument } from '@postr/data-access';

describe('PostAddComponent', () => {
  let component: PostAddComponent;
  let fixture: ComponentFixture<PostAddComponent>;
  let controller: ApolloTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule,
        RouterTestingModule,
        FormTestingModule,
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ],
      declarations: [PostAddComponent],
    }).compileComponents();

    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submitting the form', () => {
    it('should add a now post', () => {
      const { element } = createComponentFixture(PostAddComponent);

      setInputValue(element('#titleInput'), 'Test title');
      setInputValue(element('#bodyInput'), 'Test body');
      element('button[type="submit"]').click();

      const op = controller.expectOne(AddPostDocument);
      expect(op.operation.variables).toHaveProperty('title', 'Test title');
      expect(op.operation.variables).toHaveProperty('body', 'Test body');
    });
  })
});
