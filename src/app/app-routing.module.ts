import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './components/views/article/article.component';
import { HomeComponent } from './components/views/home/home.component';
import { LoginComponent } from './components/views/login/login.component';
import { EditComponent } from './components/views/new-article/edit/edit.component';
import { NewArticleComponent } from './components/views/new-article/new-article.component';
import { SignUpComponent } from './components/views/sign-up/sign-up.component';
import { AuthService } from './services/Auth.service';
import { FavoritedArticleComponent } from './components/views/my-profile/favorited-article/favorited-article.component';
import { MyArticleComponent } from './components/views/my-profile/my-article/my-article.component';
import { MyProfileResolver } from './components/views/my-profile/my-profile-resolver.service';
import { MyProfileComponent } from './components/views/my-profile/my-profile.component';
import { SettingComponent } from './components/views/setting/setting.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'home/:slug', component: ArticleComponent },
  {
    path: 'new-article',
    component: NewArticleComponent,
    canDeactivate: [AuthService]
  },

  {
    path: 'edit/:slug',
    component: EditComponent,
    canDeactivate: [AuthService]


  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  {
    path: 'settings',
    component: SettingComponent,
  },
  {
    path: ':username',
    component: MyProfileComponent,
    resolve: {
      profile: MyProfileResolver
    },
    children: [
      {
        path: 'my-posts',
        component: MyArticleComponent
      },
      {
        path: 'favorites',
        component: FavoritedArticleComponent
      }
    ]
  }
]
  @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [
  ]
})
export class AppRoutingModule {}
