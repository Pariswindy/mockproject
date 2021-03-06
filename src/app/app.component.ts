import { Component, OnInit } from '@angular/core';
import { UserService } from './services/User.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mockProject';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.populate()
  }
  

}
