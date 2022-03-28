import { Component, Input, OnInit,OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article';

import { ArticleService } from 'src/app/services/Article.service';
import { AuthService } from 'src/app/services/Auth.service';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-my-article',
  templateUrl: './my-article.component.html',
  styleUrls: ['./my-article.component.css']
})
export class MyArticleComponent implements OnInit,OnChanges {
  @Input() childOption="";
  @Input() childTag="";
  @Input() username=''
  public p: number = 1;
  myArticles: Article[]= [];

  userImage = '';

  constructor(
    private articleService: ArticleService,
    private auth: AuthService,
    private router: Router,
    private user: UserService,
    private Active:ActivatedRoute
  ) {
    // this.Active.params.subscribe((param)=>{
    //   this.username=param['username']

    // })

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.childOption==='mypost'){

      this.articleService.getArticleByAuthor(this.username).subscribe((res:any) => {
        this.myArticles = res.articles;
      })
     }else if(this.childOption==='favourite'){
      this.articleService
      .getArticleByFav(this.username)
      .subscribe((res: any) => {
        this.myArticles = res.articles;
      });
    }


  }
  ngOnInit(): void {
    this.getImageUrl


  }

  goToMyArticle(article: any) {
    let mySlug = article.slug;
    this.router.navigate([`home/${mySlug}`]);
  }

  get getImageUrl() {

    this.user.getUser(this.username).subscribe((res: any) => {
      this.userImage = res.profile.image;
    });
    return this.userImage;
  }
  goToProfile(profileUser:string) {
    this.router.navigate([`${profileUser}`])
  }

}

  // myArticles!: Article[];
  // username = this.auth.currentUser.username;
  // userImage = '';








