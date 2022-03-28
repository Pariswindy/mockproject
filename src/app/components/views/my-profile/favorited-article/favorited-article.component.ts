import { Component, OnInit , OnChanges, SimpleChanges} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/Article.service';
import { AuthService } from 'src/app/services/Auth.service';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-favorited-article',
  templateUrl: './favorited-article.component.html',
  styleUrls: ['./favorited-article.component.css']
})
export class FavoritedArticleComponent implements OnInit, OnChanges {

  public favoritedArticles: Article[] = [];
  public username !:string
  slugArticle: any;
  public p: number = 1;
  constructor(
    private articleService: ArticleService,
    private user: UserService,
    private router: Router,
    private Active:ActivatedRoute
  ) {
    this.Active.params.subscribe((param)=>{
      this.username=param['username']

  })
}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('asdasdas')
  }

  ngOnInit(): void {
    this.articleService
      .getArticleByFav(this.username)
      .subscribe((res: any) => {
        this.favoritedArticles = res.articles;
      });
  }

  goToArticle(favoritedArticle: any) {
    let slug = favoritedArticle.slug;
    this.router.navigate([`home/${slug}`]);
  }
  goToProfile(profileUser:string) {
    this.router.navigate([`${profileUser}`])
  }
  onFavorite(checked: boolean){
    console.log("asdasdasdasdsadasd" + checked)
  }

}
