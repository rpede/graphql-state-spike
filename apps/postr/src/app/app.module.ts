import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { NavigationComponent } from './navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { ProfileComponent } from './profile/profile.component';
import { GraphQLModule } from './graphql/graphql.module';
import { PostComponent } from './post/post.component';
import { IDResolver } from './id.resolver';
import { MyProfileComponent } from './my-profile/my-profile.component';

const routes: Routes = [
  {
    component: PostsComponent,
    path: 'posts',
  },
  {
    component: PostComponent,
    path: 'posts/:id',
    resolve: { id: IDResolver },
  },
  {
    component: ProfileComponent,
    path: 'profiles/:id',
    resolve: { id: IDResolver },
  },
  {
    component: MyProfileComponent,
    path: 'my-profile',
    data: { id: 0 },
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PostsComponent,
    ProfileComponent,
    PostComponent,
    MyProfileComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { enableTracing: true }),
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    GraphQLModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
