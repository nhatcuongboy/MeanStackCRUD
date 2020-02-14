import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
import { ValidatePassword } from "./../../validate/validate-password";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  submitted = false
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {

  }

  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    PasswordValidation: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatpassword: ['', Validators.required]
    }, {
      validator: ValidatePassword.MatchPassword
    }
    ),
    roles: ['user']
  })

  ngOnInit() {
  }

  // Getter method to access formcontrols
  get myForm() {
    return this.signupForm.controls;
  }

  registerUser() {
    this.submitted = true;
    if (!this.signupForm.valid) {
      alert('Please fill all the required fields!')
      return false;
    } else {
      this.authService.signUp(this.signupForm.value).subscribe((res) => {
        if (res.result) {
          this.signupForm.reset()
          if (this.authService.isAdmin) {
            this.router.navigate(['users']);
          } else {
            this.router.navigate(['log-in']);
          }
        }
      }, (error) => {
        if (error.status === 422) {
          alert("Password should form 8 to 20 character")
        } if (error.status === 500) {
          alert("Duplicated email!")
        }
      })
    }
  }
}
