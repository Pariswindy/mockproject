import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Params, Router } from '@angular/router';
import { concatMap, tap } from 'rxjs';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { ArticleService } from 'src/app/services/Article.service';
import { AuthService } from 'src/app/services/Auth.service';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  public CurrentUserName!: string
  public tag:string =""
  public option:string=""
  public profile!: Profile;
  public currentUser!: User;
  public isUser!: boolean;
  public checkLogin:boolean = true



  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public router: Router
    ) {
    }


  ngOnInit() {
    this.userService.isAuthenticated.subscribe(islogin => this.checkLogin = islogin)
    this.option = 'mypost'
    this.route.data.subscribe(
      (data: Data) => {
        this.profile = data['profile'];


      }
    );
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        // this.profile = userData;
        this.CurrentUserName =this.currentUser.username;
        // this.CurrentUserName = this.currentUser.username;

      }
    );





  }
  showMyPost(){
    this.option = 'mypost'
  }

  showFavourite(){
    this.option = 'favourite'

  }

  public onToggleFollowing(following: boolean) {
    this.profile.following = following;
  }
  // onToggleFollowing(following: boolean) {
  //   this.profile.following = following;
  // }
}
