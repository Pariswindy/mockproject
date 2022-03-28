import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/User.service';
import { AuthService } from '../../../services/Auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser!: User;
  isLogging = false;
  constructor(private userService: UserService,
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
