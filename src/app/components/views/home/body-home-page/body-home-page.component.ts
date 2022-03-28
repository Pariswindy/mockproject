import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/Article.service';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-body-home-page',
  templateUrl: './body-home-page.component.html',
  styleUrls: ['./body-home-page.component.css'],
})
export class BodyHomePageComponent implements OnInit {
  public tags: string[] = [];
  public tag:string =""
  public option:string=""
  public checkLogin:boolean = true
  constructor(private _articleService: ArticleService, private _userService: UserService) {
    this._userService.isAuthenticated.subscribe(islogin => this.checkLogin = islogin) 
  }

  ngOnInit(): void {
   this._articleService.getGlobalTags().subscribe(data => this.tags = data.tags)
    if(!this.checkLogin){
      this.option ='global';
    }else{
      this.option ='user';
    }
  }

  showDetailTag(tag:string){
    this.tag = tag;
    this.option = 'tag';
  }

  showGlobalFeed(){
    this.tag ="";
    this.option = 'global'
  }
  
  showUserFeed(){
    this.tag ="";
    this.option = 'user'

  }

  out(){
    this._userService.purgeAuth();
    this.option = 'global'
  }
}
