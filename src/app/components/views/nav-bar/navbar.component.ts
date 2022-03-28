import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/User.service';
import { AuthService } from '../../../services/Auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser!: User;
  isLogging = false;
  isInProfilePage?: boolean;
  isActivated!: boolean;
  constructor(private userService: UserService, public router: Router, private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.userService.currentUser.subscribe(
      userData => this.currentUser = userData
    )
    this.userService.isAuthenticated.subscribe(
      isLogging => {
        this.isLogging = isLogging
      }
    )
  }

  logOut() {
    this.userService.purgeAuth()
  }

}
