import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  //signinForm: FormGroup;
  submitted = false;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    // this.signinForm = this.fb.group({
    //   email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    //   password: ['', Validators.required]
    // })
  }

  signinForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    password: ['', Validators.required]
  })

  ngOnInit() { }

  // Getter method to access formcontrols
  get myForm() {
    return this.signinForm.controls;
  }
  loginUser() {
    this.submitted = true;
    if (!this.signinForm.valid) {
      alert('Please fill all the required fields!')
      return false;
    } else {
      this.authService.signIn(this.signinForm.value)
    }
  }
}