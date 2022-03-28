import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { ProfilesService } from 'src/app/services/profiles.service';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css'],
})
export class FollowButtonComponent implements OnInit {
  constructor(
    private profilesService: ProfilesService,
    private router: Router,
    private userService: UserService
  ) {}

  @Input() profile!: Profile;
  @Output() Toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFollowing() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.subscribe((authenticated) => {
      // Not authenticated? Push to login screen
      if (!authenticated) {
        this.router.navigateByUrl('/login');
        return;
      }

      // Follow this profile if we aren't already
      if (!this.profile.following) {
        this.profilesService.follow(this.profile.username).subscribe({
          next: (data) => {
            this.isSubmitting = false;
            this.profile.following = true
          },
          error: (err) => (this.isSubmitting = false),
        });

        // Otherwise, unfollow this profile
      } else {
        this.profilesService.unfollow(this.profile.username).subscribe({
          next: (data) => {
            this.isSubmitting = false;
            this.profile.following = false
          },
          error: (err) => (this.isSubmitting = false),
        });
      }
    });
  }

  ngOnInit(): void {}
}
