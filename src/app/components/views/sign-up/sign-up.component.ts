import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/Auth.service';
import { UserService } from 'src/app/services/User.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: any;
  usernameError: string = '';
  emailError: string = '';
  messageError: string = '';
  signUpError: string = '';
  isSubmitting = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private userService: UserService
  ) {
    this.signupForm = fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  ngOnInit() {
  }

  submitForm() {
    this.isSubmitting = true;

    const credentials = this.signupForm.value;
    console.log(this.signupForm.value)
    this.userService
    .attemptAuthSignUp(credentials)
    .subscribe({
      next: (data: any) => this.router.navigateByUrl('/home'),
      error: (err: any) => {
        console.log((err?.error?.errors))
        this.isSubmitting = false;
        this.usernameError = 'Email or username is already taken!'
      }
    });
  }



  public get(val: string | number) {
    return this.signupForm.controls[val];
  }

  public signUp() {
    const userData: {} = {
      username: this.signupForm.controls.username.value,
      email: this.signupForm.controls.email.value,
      password: this.signupForm.controls.password.value
    }

    this.auth.createUser(userData).subscribe({
      next: data => {
        let currentUser: {} = data;
        console.log(currentUser);
      }
      // error: (err: HttpErrorResponse) => {
      //   if (err.error.errors.username) {
      //     // this.signUpError = err.error.errors.username[0]


      //   } if (err.error.errors.email) {
      //     // this.signUpError = err.error.errors.email[0]

      //   }
      // }
    })
  }



}




