import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/Article.service';
import { AuthService } from 'src/app/services/Auth.service';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-favorited-article',
  templateUrl: './favorited-article.component.html',
  styleUrls: ['./favorited-article.component.css']
})
export class FavoritedArticleComponent implements OnInit {

  // favoritedArticles: Article[] = [];
  // username = this.auth.currentUser.username;
  // userImage = '';
  // slugArticle: any;

  constructor(
    private articleService: ArticleService,
    private auth: AuthService,
    private user: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.getImageUrl
    // this.articleService
    //   .getArticleByFav(this.auth.currentUser.username)
    //   .subscribe((res: any) => {
    //     this.favoritedArticles = res.articles;
    //   });
  }

  // get getImageUrl() {
  //   this.user.getUser(this.username).subscribe((res: any) => {
  //     this.userImage = res.profile.image;
  //   });
  //   return this.userImage;
  // }

  // goToArticle(favoritedArticle: any) {
  //   let slug = favoritedArticle.slug;
  //   this.router.navigate([`article/${slug}`]);
  // }

}
