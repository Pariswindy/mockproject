import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Article, Articles, ListArticleUser } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/Article.service';
import { UserService } from 'src/app/services/User.service';
import { User } from '../../../../../models/user';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit, OnChanges {
  public listArticles!: Article[];
  public currentUser!: User;
  public p: number = 1;
  @Input() childOption = '';
  @Input() username = '';
  @Input() childTag = '';
  @Input() childCheckLogin = false;
  public waitingMes = '';
  constructor(
    private _articleService: ArticleService,
    private _userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    // this.waitingMes = 'doi tui load';
  }
  ngOnChanges(changes: SimpleChanges): void {
    // this.waitingMes = 'doi tui load';
    this.spinner.show();
    this.listArticles = [];
    this._userService.currentUser.subscribe(
      (user) => (this.currentUser = user)
    );
    if (this.childOption === 'global') {
      this._articleService
        .getGlobalArticles()
        .subscribe((data: ListArticleUser) => {
          // this.waitingMes = '';
          this.spinner.hide();
          this.listArticles = data.articles;
        });
    } else if (this.childOption === 'tag') {
      this._articleService.getDetailTag(this.childTag).subscribe((data) => {
        // this.waitingMes = '';
        this.spinner.hide();
        this.listArticles = data.articles;
      });
    } else if (this.childOption === 'user') {
      this._articleService
        .getUsersArticles(this.currentUser.username)
        .subscribe((data) => {
          // this.waitingMes = '';
          this.spinner.hide();
          this.listArticles = data.articles;
        });
    } else if (this.childOption === 'mypost') {
      this._articleService
        .getArticleByAuthor(this.username)
        .subscribe((data: Articles) => {
          // this.waitingMes = '';
          this.spinner.hide();
          this.listArticles = data.articles;
        });
    } else if (this.childOption === 'favourite'){
      this._articleService
      .getArticleByFav(this.username)
      .subscribe((res: any) => {
        // this.waitingMes = '';
        this.spinner.hide();
        this.listArticles = res.articles;
      })
    }
  }

  ngOnInit(): void {

  }
  goToProfile(username: string) {
    this.router.navigate([`${username}`]);
  }

  onFavorite(checked: boolean, index: number) {
    if(this.childOption ==='favourite'){
      this.listArticles.splice(index,1)
    }
  }
}
