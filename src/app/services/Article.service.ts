import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ListArticleUser, OutFavorite, ResponArticle } from '../models/article';
import { oneComment, outComment } from '../models/comment';
import { AuthService } from './Auth.service';
import { Articles } from '../models/article';
import { Tags } from '../models/article';
import { UserService } from './User.service';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  public token:string =``

  constructor(private http: HttpClient, private _authService: AuthService, private _jwtService: JwtService) {}

  getArticle() {
    return this.http.get('https://conduit.productionready.io/api/articles');
  }


  public getUsersArticles(user:string) {
    const url = `https://api.realworld.io/api/articles/feed`;
    return this.http.get<Articles>(url);
  }
  public getGlobalArticles() {
    const url = `https://conduit.productionready.io/api/articles`;
    return this.http.get<Articles>(url);
  }

  public getGlobalTags() {
    const url = `https://conduit.productionready.io/api/tags`;
    return this.http.get<Tags>(url);
  }

  public getDetailTag(tag:string) {
    const url = `https://conduit.productionready.io/api/articles?tag=${tag}`;
    return this.http.get<Articles>(url);
  }

  public favoriteArticle(slug: string){
    const url = `https://conduit.productionready.io/api/articles/${slug}/favorite`;
    return this.http.post(url,{});
  }

  public unfavoriteArticle(slug: string){
    const url = `https://conduit.productionready.io/api/articles/${slug}/favorite`;
    return this.http.delete(url);
  }

  getSlugArticle(slug: string) {
    return this.http.get<ResponArticle>(
      `https://conduit.productionready.io/api/articles/${slug}`
    );
  }

  createArticle(
    title: string,
    description: string,
    body: string,
    tagList: string[]
  ) {
    const option= {
      headers : new HttpHeaders({
      'Content-type':  'application/json',
      'Authorization': `Token ${this._authService.currentUser.token}`
    })}
    return this.http.post(
      'https://conduit.productionready.io/api/articles',
      {
        'article': {
          'title': title,
          'description': description,
          'body': body,
          'tagList':tagList
        },
      },option
    );
  }

  getProfile(val: string) {
    return this.http.get(
      `https://conduit.productionready.io/api/profiles/${val}`
    );
  }
  getFollow(username:string) {
    const option= {
      headers : new HttpHeaders({
      'Content-type':  'application/json',
      'Authorization': `Token ${this._authService.currentUser.token}`
    })}
    return this.http.post(`https://conduit.productionready.io/api/profiles/${username}/follow`,{},option)
  }
  delFollow(username:string) {
    const option= {
      headers : new HttpHeaders({
      'Content-type':  'application/json',
      'Authorization': `Token ${this._authService.currentUser.token}`
    })}
    return this.http.delete(`https://conduit.productionready.io/api/profiles/${username}/follow`,option)
  }


  getFavourite(slug:string) {
    const option= {
      headers : new HttpHeaders({
      'Content-type':  'application/json',
      'Authorization': `Token ${this._authService.currentUser.token}`
    })}

    return this.http.post<OutFavorite>(`https://conduit.productionready.io/api/articles/${slug}/favorite`,{},option)
  }

  delFavourite(slug:string) {
    const option= {
      headers : new HttpHeaders({
      'Content-type':  'application/json',
      'Authorization': `Token ${this._authService.currentUser.token}`
    })}
    return this.http.delete<OutFavorite>(`https://conduit.productionready.io/api/articles/${slug}/favorite`,option)
  }



  getCommentArticle(slug: string) {
    return this.http.get<outComment>(
      'https://conduit.productionready.io/api/articles/' + slug + '/comments'
    );
  }

  addCommentArticle(slug: string, body: string) {
    const option= {
      headers : new HttpHeaders({
      'Content-type':  'application/json',
      'Authorization': `Token ${this._authService.currentUser.token}`
    })}
    console.log(this._authService.currentUser.token)
    return this.http.post<oneComment>(
      'https://conduit.productionready.io/api/articles/' + slug + '/comments',
      {
        'comment': {
          'body': body,
        },
      },option
    );
  }

  deleteCommentArticle(slug: string, id: number) {
    const option= {
      headers : new HttpHeaders({
      'Content-type':  'application/json',
      'Authorization': `Token ${this._authService.currentUser.token}`
    })}
    return this.http.delete(
      `https://conduit.productionready.io/api/articles/${slug}/comments/${id}`,option
    );
  }
  deleteArticle(slug: string) {
    const option= {
      headers : new HttpHeaders({
      'Content-type':  'application/json',
      'Authorization': `Token ${this._authService.currentUser.token}`
    })}
    return this.http.delete(
      `https://conduit.productionready.io/api/articles/${slug}`,option
    );
  }
  updateArticle(slug:string,
    title?: string,
    description?: string,
    body?: string,
    tagList?: string[]){
    const option= {
      headers : new HttpHeaders({
      'Content-type':  'application/json',
      'Authorization': `Token ${this._authService.currentUser.token}`

  })}
  return this.http.put<ResponArticle>(`https://conduit.productionready.io/api/articles/${slug}`,{
    'article': {
      'title': title,
      'description': description,
      'body': body,
    },
  },option)
}
getArticleListUser(){
  return this.http.get<ListArticleUser>(`https://conduit.productionready.io/api/articles/?author=${this._authService.currentUser.username}`)
}

}
