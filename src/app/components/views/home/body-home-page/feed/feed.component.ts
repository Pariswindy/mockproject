import { Component, Input, OnInit ,OnChanges, SimpleChanges} from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/Article.service';
import { UserService } from 'src/app/services/User.service';
import { User } from '../../../../../models/user';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  public listArticles!:Article[];
  public currentUser!:User;
  @Input() childOption="";
  @Input() childTag="";
  @Input() childCheckLogin = false;
  public waitingMes=""
  constructor(private _articleService: ArticleService, private _userService: UserService) { 
    this.waitingMes="doi tui load"
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.waitingMes="doi tui load"
    this.listArticles =[];
    this._userService.currentUser.subscribe(user => this.currentUser = user);
     if(this.childOption==='global'){
      
      this._articleService.getGlobalArticles().subscribe(data => {
        console.log(data)
        this.waitingMes=""
        this.listArticles = data.articles;
      })
     }else if(this.childOption==='tag'){
      this._articleService.getDetailTag(this.childTag).subscribe(data => {
        this.waitingMes=""
        this.listArticles = data.articles;
      })
     }else if(this.childOption==='user'){
      this._articleService.getUsersArticles(this.currentUser.username).subscribe(data => {
        this.waitingMes=""
        this.listArticles = data.articles;
      })
     }
  }

  ngOnInit(): void {  
    
    if(!this.childCheckLogin){
      this._articleService.getGlobalArticles().subscribe(data => {
        this.waitingMes=""
        this.listArticles = data.articles;
      })
    }else{
      this._userService.currentUser.subscribe(user => this.currentUser = user);
      this._articleService.getUsersArticles(this.currentUser.username).subscribe(data => {
        this.waitingMes=""
        this.listArticles = data.articles;
        
      })
    }
  }


  onFavorite(checked: boolean,item: Article){
    
  }
}
