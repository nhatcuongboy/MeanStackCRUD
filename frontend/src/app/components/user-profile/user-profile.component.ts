import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  currentUser: Object = {};
  isEdit = false
  submitted = false

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe(res => {
      this.currentUser = res.msg;
    })

  }

  ngOnInit() { }

  // editForm = this.fb.group({
  //   name: [this.currentUser['name'], [Validators.required, Validators.minLength(3)]],
  //   email: [this.currentUser['email'], [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
  //   password: [this.currentUser['password'], [Validators.required, Validators.minLength(8)]],
  //   roles: [this.currentUser['roles'], Validators.required]
  // })

  // get myForm() {
  //   return this.editForm.controls;
  // }

  // edit() {
  //   console.log("edit")
  //   this.isEdit = true
  // }

  // save() {
  //   console.log("save")
  //   this.isEdit = false
  //   this.submitted = true;
  //   if (!this.editForm.valid) {
  //     alert('Please fill all the required fields!')
  //     return false;
  //   } else {
  //     //
  //   }
  // }

}