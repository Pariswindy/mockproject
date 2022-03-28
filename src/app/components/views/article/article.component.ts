import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/Article.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../../models/article';
import { Subscription, switchMap } from 'rxjs';
import { Comment } from 'src/app/models/comment';
import { AuthService } from 'src/app/services/Auth.service';
import { UserService } from 'src/app/services/User.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit,OnDestroy {
  public newComment: string = '';
  public ArticleDetailSlug: string = '';
  public ArticleDetail!: Article;
  public ListComment: Comment[] = [];
  public comment!: Comment;
  public isfavour: boolean | undefined;
  public isfollow!: boolean;
  public numberfavour!: number;
  public CurrentUserName!: string;
  public isAuth: Subscription = new Subscription();
  public isLogin!: boolean;
  public p=1

  constructor(
    public article: ArticleService,
    public activeroute: ActivatedRoute,
    public auth: AuthService,
    public UserAuth: UserService,
    public router: Router,
    public userService:UserService

  ) {
     this.userService.currentUser.subscribe(
      (userData: User) => {
        this.CurrentUserName =userData.username ;

      }
    );
    this.isAuth.add(this.UserAuth.isAuthenticated.subscribe((data: boolean) => {
      this.isLogin = data;
    }));
    this.isAuth.add(this.activeroute.params
      .pipe(
        switchMap((params) => {
          this.ArticleDetailSlug = params['slug'];
          return this.article.getSlugArticle(params['slug']);
        })
      )
      .subscribe((respon) => {
        this.ArticleDetail = respon.article;
        this.isfollow = respon.article.author.following;
        this.isfavour = respon.article.favorited;
        this.numberfavour = respon.article.favoritesCount;
      }));
      this.isAuth.add(this.activeroute.params
      .pipe(
        switchMap((parmas) => {
          return this.article.getCommentArticle(parmas['slug']);
        })
      )
      .subscribe((respon) => {
        this.ListComment = respon.comments;
      }));
  }
  ngOnInit() {}
  follow(item: string) {
    if (!this.isLogin) {
      this.router.navigate(['/login']);
    } else {
      this.ArticleDetail.author.following = true;
      this.isAuth.add(this.article.getFollow(item).subscribe((isfolow) => {}));
    }
  }
  unfollow(item: string) {
    if (!this.isLogin) {
      this.router.navigate(['/login']);
    } else {
      this.ArticleDetail.author.following = false;
      this.isAuth.add(this.article.delFollow(item).subscribe((isunfolow) => {}));
    }
  }

  favourite() {
    if (!this.isLogin) {
      this.router.navigate(['/login']);
    } else {
      this.numberfavour++;
      this.isfavour = !this.isfavour;
      this.isAuth.add(this.article
        .getFavourite(this.ArticleDetailSlug)
        .subscribe((favour) => {}));
    }
  }
  unfavourite() {
    if (!this.isLogin) {
      this.router.navigate(['/login']);
    } else {
      this.numberfavour--;
      this.isfavour = !this.isfavour;
      this.isAuth.add(this.article
        .delFavourite(this.ArticleDetailSlug)
        .subscribe((favour) => {}));
    }
  }

  sendPost(slug: string, text: string) {
    if (!this.isLogin) {
      this.router.navigate(['/login']);
    } else {
      this.isAuth.add(this.article.addCommentArticle(slug, text).subscribe((res) => {
        this.ListComment.push(res.comment);
      }));
      this.newComment = '';
    }
    // })
  }

  deleteComment(slug: string, id: number, index: number) {
    if (!this.isLogin) {
      this.router.navigate(['/login']);
    } else {
      this.isAuth.add(this.article.deleteCommentArticle(slug, id).subscribe((delcomment) => {}));
      this.ListComment.splice(index, 1);
    }
  }
  deleteArticle(slug: string) {
    if (!this.isLogin) {
      this.router.navigate(['/login']);
    } else {
      this.isAuth.add(this.article.deleteArticle(slug).subscribe((delArt) => {}));
      this.router.navigate(['/home']);
    }
  }
  goToProfile(username:string){
    this.router.navigate([`${username}`])


  }

  ngOnDestroy(): void {
    this.isAuth.unsubscribe()
  }
}
