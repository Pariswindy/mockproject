import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(isLogin => console.log('is login?', isLogin))
    console.log('home current user', this.userService.getCurrentUser())
  }

}
