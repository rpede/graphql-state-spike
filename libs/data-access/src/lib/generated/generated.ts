import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPost?: Maybe<Post>;
  updatePost?: Maybe<Post>;
  updateProfile?: Maybe<Profile>;
};


export type MutationAddPostArgs = {
  authorId: Scalars['Int'];
  body?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  body?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  title?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateProfileArgs = {
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  author: Profile;
  body?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  preview?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  firstName: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  posts: Array<Post>;
};

export type Query = {
  __typename?: 'Query';
  post?: Maybe<Post>;
  posts: Array<Post>;
  postsByAuthor: Array<Post>;
  profile?: Maybe<Profile>;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsByAuthorArgs = {
  authorId: Scalars['Int'];
};


export type QueryProfileArgs = {
  id: Scalars['Int'];
};

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: number, title: string, preview?: string | null | undefined, author: { __typename?: 'Profile', fullName: string } }> };

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: number, title: string, body?: string | null | undefined, author: { __typename?: 'Profile', id: number, fullName: string } } | null | undefined };

export type PostsByAuthorQueryVariables = Exact<{
  authorId: Scalars['Int'];
}>;


export type PostsByAuthorQuery = { __typename?: 'Query', postsByAuthor: Array<{ __typename?: 'Post', id: number, title: string, body?: string | null | undefined, author: { __typename?: 'Profile', id: number, fullName: string } }> };

export type AddPostMutationVariables = Exact<{
  authorId: Scalars['Int'];
  title: Scalars['String'];
  body?: InputMaybe<Scalars['String']>;
}>;


export type AddPostMutation = { __typename?: 'Mutation', addPost?: { __typename?: 'Post', id: number, title: string, body?: string | null | undefined, author: { __typename?: 'Profile', id: number, fullName: string } } | null | undefined };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int'];
  title?: InputMaybe<Scalars['String']>;
  body?: InputMaybe<Scalars['String']>;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: { __typename?: 'Post', id: number, title: string, body?: string | null | undefined, author: { __typename?: 'Profile', id: number, fullName: string } } | null | undefined };

export type PostWithAuthorFragment = { __typename?: 'Post', id: number, title: string, body?: string | null | undefined, author: { __typename?: 'Profile', id: number, fullName: string } };

export type PostWithPreviewFragment = { __typename?: 'Post', id: number, title: string, preview?: string | null | undefined, author: { __typename?: 'Profile', fullName: string } };

export type ProfileWithPostsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProfileWithPostsQuery = { __typename?: 'Query', profile?: { __typename?: 'Profile', id: number, fullName: string, posts: Array<{ __typename?: 'Post', id: number, title: string }> } | null | undefined };

export type ProfileQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProfileQuery = { __typename?: 'Query', profile?: { __typename?: 'Profile', id: number, firstName: string, lastName: string } | null | undefined };

export type UpdateProfileMutationVariables = Exact<{
  id: Scalars['Int'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile?: { __typename?: 'Profile', id: number, firstName: string, lastName: string } | null | undefined };

export const PostWithAuthorFragmentDoc = gql`
    fragment postWithAuthor on Post {
  id
  title
  body
  author {
    id
    fullName
  }
}
    `;
export const PostWithPreviewFragmentDoc = gql`
    fragment postWithPreview on Post {
  id
  title
  preview
  author {
    fullName
  }
}
    `;
export const PostsDocument = gql`
    query posts {
  posts {
    ...postWithPreview
  }
}
    ${PostWithPreviewFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class PostsGQL extends Apollo.Query<PostsQuery, PostsQueryVariables> {
    document = PostsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PostDocument = gql`
    query post($id: Int!) {
  post(id: $id) {
    ...postWithAuthor
  }
}
    ${PostWithAuthorFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class PostGQL extends Apollo.Query<PostQuery, PostQueryVariables> {
    document = PostDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PostsByAuthorDocument = gql`
    query postsByAuthor($authorId: Int!) {
  postsByAuthor(authorId: $authorId) {
    ...postWithAuthor
  }
}
    ${PostWithAuthorFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class PostsByAuthorGQL extends Apollo.Query<PostsByAuthorQuery, PostsByAuthorQueryVariables> {
    document = PostsByAuthorDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddPostDocument = gql`
    mutation addPost($authorId: Int!, $title: String!, $body: String) {
  addPost(authorId: $authorId, title: $title, body: $body) {
    ...postWithAuthor
  }
}
    ${PostWithAuthorFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AddPostGQL extends Apollo.Mutation<AddPostMutation, AddPostMutationVariables> {
    document = AddPostDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdatePostDocument = gql`
    mutation updatePost($id: Int!, $title: String, $body: String) {
  updatePost(id: $id, title: $title, body: $body) {
    ...postWithAuthor
  }
}
    ${PostWithAuthorFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdatePostGQL extends Apollo.Mutation<UpdatePostMutation, UpdatePostMutationVariables> {
    document = UpdatePostDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ProfileWithPostsDocument = gql`
    query profileWithPosts($id: Int!) {
  profile(id: $id) {
    id
    fullName
    posts {
      id
      title
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ProfileWithPostsGQL extends Apollo.Query<ProfileWithPostsQuery, ProfileWithPostsQueryVariables> {
    document = ProfileWithPostsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ProfileDocument = gql`
    query profile($id: Int!) {
  profile(id: $id) {
    id
    firstName
    lastName
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ProfileGQL extends Apollo.Query<ProfileQuery, ProfileQueryVariables> {
    document = ProfileDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateProfileDocument = gql`
    mutation updateProfile($id: Int!, $firstName: String!, $lastName: String!) {
  updateProfile(id: $id, firstName: $firstName, lastName: $lastName) {
    id
    firstName
    lastName
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateProfileGQL extends Apollo.Mutation<UpdateProfileMutation, UpdateProfileMutationVariables> {
    document = UpdateProfileDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }