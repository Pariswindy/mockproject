import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit {
  public user: User = {} as User;
  public settingsForm!: FormGroup;
  // errors: Errors = {errors: {}};
  isSubmitting = false;
  public validateImg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // create form group using the form builder
  }

  ngOnInit() {
    // Make a fresh copy of the current user's object to place in editable form fields
    this.user = this.userService.getCurrentUser();
    this.settingsForm = this.fb.group({
      image: [
        this.user.image ||
          'https://static.productionready.io/images/smiley-cyrus.jpg',
      ],
      username: [this.user.username, [Validators.required]],
      bio: [this.user.bio],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  submitForm() {
    this.isSubmitting = true;
    // update the model
    this.updateUser(this.settingsForm.value);
    this.userService.update(this.user).subscribe({
      next: (updatedUser) =>
        this.router.navigateByUrl(`/${updatedUser.username}`),
      error: (err) => {
        // this.errors = err;
        alert('Loi me roi');
        this.isSubmitting = false;
      },
    });
  }

  updateUser(values: User) {
    if (
      values.image.match(this.validateImg) === null ||
      values.image.match(this.validateImg) === undefined
    ) {
      alert('Invalid image url. We will set a default profile image for');
      values.image =
        'https://static.productionready.io/images/smiley-cyrus.jpg';
      this.user = values;
    } else {
      this.user = values;
    }
  }
}
