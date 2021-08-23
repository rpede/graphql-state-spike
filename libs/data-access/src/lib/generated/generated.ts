import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
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
  title: Scalars['String'];
  body?: Maybe<Scalars['String']>;
};


export type MutationUpdatePostArgs = {
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
};


export type MutationUpdateProfileArgs = {
  id: Scalars['Int'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Int'];
  author: Profile;
  title: Scalars['String'];
  body?: Maybe<Scalars['String']>;
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['Int'];
  firstName: Scalars['String'];
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


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: number, title: string, body?: Maybe<string>, author: { __typename?: 'Profile', id: number, firstName: string, lastName: string } }> };

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = { __typename?: 'Query', post?: Maybe<{ __typename?: 'Post', id: number, title: string, body?: Maybe<string>, author: { __typename?: 'Profile', id: number, firstName: string, lastName: string } }> };

export type PostsByAuthorQueryVariables = Exact<{
  authorId: Scalars['Int'];
}>;


export type PostsByAuthorQuery = { __typename?: 'Query', postsByAuthor: Array<{ __typename?: 'Post', id: number, title: string, body?: Maybe<string>, author: { __typename?: 'Profile', id: number, firstName: string, lastName: string } }> };

export type AddPostMutationVariables = Exact<{
  authorId: Scalars['Int'];
  title: Scalars['String'];
  body?: Maybe<Scalars['String']>;
}>;


export type AddPostMutation = { __typename?: 'Mutation', addPost?: Maybe<{ __typename?: 'Post', id: number, title: string, body?: Maybe<string>, author: { __typename?: 'Profile', id: number, firstName: string, lastName: string } }> };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: Maybe<{ __typename?: 'Post', id: number, title: string, body?: Maybe<string>, author: { __typename?: 'Profile', id: number, firstName: string, lastName: string } }> };

export type PostWithAuthorFragment = { __typename?: 'Post', id: number, title: string, body?: Maybe<string>, author: { __typename?: 'Profile', id: number, firstName: string, lastName: string } };

export type ProfileQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProfileQuery = { __typename?: 'Query', profile?: Maybe<{ __typename?: 'Profile', id: number, firstName: string, lastName: string }> };

export type UpdateProfileMutationVariables = Exact<{
  id: Scalars['Int'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile?: Maybe<{ __typename?: 'Profile', id: number, firstName: string, lastName: string }> };

export const PostWithAuthorFragmentDoc = gql`
    fragment postWithAuthor on Post {
  id
  title
  body
  author {
    id
    firstName
    lastName
  }
}
    `;
export const PostsDocument = gql`
    query posts {
  posts {
    ...postWithAuthor
  }
}
    ${PostWithAuthorFragmentDoc}`;

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