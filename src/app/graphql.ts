
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Post {
    id: number;
    author: Profile;
    title: string;
    body?: Nullable<string>;
    preview?: Nullable<string>;
}

export interface IQuery {
    posts(): Post[] | Promise<Post[]>;
    post(id: number): Nullable<Post> | Promise<Nullable<Post>>;
    postsByAuthor(authorId: number): Post[] | Promise<Post[]>;
    profile(id: number): Nullable<Profile> | Promise<Nullable<Profile>>;
}

export interface IMutation {
    addPost(authorId: number, title: string, body?: Nullable<string>): Nullable<Post> | Promise<Nullable<Post>>;
    updatePost(id: number, title?: Nullable<string>, body?: Nullable<string>): Nullable<Post> | Promise<Nullable<Post>>;
    updateProfile(id: number, firstName: string, lastName: string): Nullable<Profile> | Promise<Nullable<Profile>>;
}

export interface Profile {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    posts: Post[];
}

type Nullable<T> = T | null;
