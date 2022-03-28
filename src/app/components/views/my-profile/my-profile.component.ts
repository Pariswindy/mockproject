import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  profile!: Profile;
  currentUser!: User;
  isUser!: boolean;

  ngOnInit() {


    // this.route.data.subscribe(
    //   (data: Data) => {
    //     console.log(data)
    //     this.profile = data['profile'];
    //   }
    // );

    this.profile = this.route.snapshot.data['profile']
    console.log(this.profile)

    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        // this.profile = userData;
        this.isUser = (this.currentUser.username === this.profile.username);
        console.log(this.isUser)
      }
    );
  }

  onToggleFollowing(following: boolean) {
    this.profile.following = following;
  }
}
