import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NewArticleComponent } from './components/views/new-article/new-article.component';

import { NavbarComponent } from './components/views/nav-bar/navbar.component';
import { FooterComponent } from './components/views/footer/footer.component';
import { ArticleComponent } from './components/views/article/article.component';

import { LoginComponent } from './components/views/login/login.component';
import { SignUpComponent } from './components/views/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BodyHomePageComponent } from './components/views/home/body-home-page/body-home-page.component';
import { FeedComponent } from './components/views/home/body-home-page/feed/feed.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ArticleService } from './services/Article.service';
import { AuthService } from './services/Auth.service';
import { JwtService } from './services/jwt.service';
import { HttpTokenInterceptor } from './interceptors/http-token.interceptor';
import { ApiService } from './services/api.service';
import { UserService } from './services/User.service';
import { SettingComponent } from './components/views/setting/setting.component';

import { HomeComponent } from './components/views/home/home.component';
import { EditComponent } from './components/views/new-article/edit/edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDailogComponent } from './components/views/new-article/confirm-dailog/confirm-dailog.component';
import { MatButtonModule } from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




import { FavoriteComponent } from './components/commons/share/favorite/favorite.component';
import { MyProfileComponent } from './components/views/my-profile/my-profile.component';
import { MyProfileResolver } from './components/views/my-profile/my-profile-resolver.service';
import { FollowButtonComponent } from './components/commons/follow-button/follow-button.component';
import { FavoritedArticleComponent } from './components/views/my-profile/favorited-article/favorited-article.component';
import { MyArticleComponent } from './components/views/my-profile/my-article/my-article.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ArticleComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    SettingComponent,
    NewArticleComponent,
    ArticleComponent,
    EditComponent,
    ConfirmDailogComponent,
    BodyHomePageComponent,
    FeedComponent,
    SettingComponent,
    FavoriteComponent,
    SettingComponent,
    MyProfileComponent,
    FollowButtonComponent,
    FavoritedArticleComponent,
    MyArticleComponent

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    NgbModule,

  ],

  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ArticleService,
    AuthService,
    JwtService,
    ApiService,
    UserService,
    MyProfileResolver,

  ],
})
export class AppModule { }


