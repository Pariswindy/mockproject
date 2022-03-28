import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  user: User = {} as User;
  settingsForm: FormGroup;
  // errors: Errors = {errors: {}};
  isSubmitting = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // create form group using the form builder
    this.settingsForm = this.fb.group({
      image: ['',],
      username: [''],
      bio: [''],
      email: [''],
      password: ['']
    });
    // Optional: subscribe to changes on the form
    // this.settingsForm.valueChanges.subscribe(values => this.updateUser(values));
  }

  ngOnInit() {
    // Make a fresh copy of the current user's object to place in editable form fields
    Object.assign(this.user, this.userService.getCurrentUser());
    console.log('test hàm getCurrentUser', this.user)

    // this.userService.currentUser.subscribe(data => {
    //   this.settingsForm.patchValue(data)
    //   console.log(data)
    // })
    // Fill the form
    this.settingsForm.patchValue(this.user);
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateUser(this.settingsForm.value);

    this.userService
    .update(this.user)
    .subscribe({
      next: updatedUser => this.router.navigateByUrl(`/${updatedUser.username}`),
      error: err => {
        // this.errors = err;
        this.isSubmitting = false;
      }
    }
    );
  }

  updateUser(values: Object) {
    Object.assign(this.user, values);
  }

}
