import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/Article.service';
import { UserService } from 'src/app/services/User.service';
import {Article} from '../../../../models/article'
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
 @Input() childItem!:Article;
 @Output() isFavorite = new EventEmitter();
  public summitFavo = true;
  public checkLogin = false;
  constructor(private _articleService: ArticleService, private _userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this._userService.isAuthenticated.subscribe(islogin => this.checkLogin = islogin) 
  }


  toggleFavorite(){
    if(!this.checkLogin){
      this.router.navigate(['/login']);
      return;
    }

    this.summitFavo = false;
    if(this.childItem.favorited){
      this._articleService.unfavoriteArticle(this.childItem.slug).subscribe(data => {
        console.log('ok ok')
        this.childItem.favoritesCount--;
        this.childItem.favorited = false
        this.summitFavo =true;
      })
     
    }else{
      console.log(this.childItem.favorited)
      this._articleService.favoriteArticle(this.childItem.slug).subscribe(data => {
        this.childItem.favoritesCount++
        this.childItem.favorited = true
        this.summitFavo =true;
      })
    
    }
 
  }
}
