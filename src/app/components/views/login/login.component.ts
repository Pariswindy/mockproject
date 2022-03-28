import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth.service';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/User.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm;
  public messageError: string = '';
  isSubmitting = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private userService: UserService
  ) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
  }
  public get(val: string | number) {
    return this.loginForm.controls[val];
  }

  login() {}

  submitForm() {
    this.isSubmitting = true;

    let credentials = this.loginForm.value;
    this.userService
    .attemptAuthLogin(credentials)
    .subscribe({
      next: (data: any) => this.router.navigateByUrl('/home'),
      error: (err: any) => {
        console.log((err?.error?.errors))
        this.messageError = 'Email or password is invalid!'
        console.log(this.messageError)
      }
    });
  }

  // public login() {
  //   const dataLogin: {} = {
  //     email: this.loginForm.controls['email'].value,
  //     password: this.loginForm.controls['password'].value
  //   }
  //   this.auth.login(dataLogin).subscribe({
  //     next: data => {
  //       console.log('Login Successfully');
  //     }
  //   })

  // }
}
