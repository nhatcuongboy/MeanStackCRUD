import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  userList: any = [];
  constructor(
    public authService: AuthService,
    public router: Router
  ) {
    this.authService.getUsers().subscribe(
      (res) => {
        this.userList = res
      }, (error) => {
        console.log(error);
      });
  }

  ngOnInit() {
  }

  deleteUser(user, index) {
    if (window.confirm('Are you sure?')) {
      this.authService.deleteUser(user._id).subscribe((data) => {
        this.userList.splice(index, 1);
      }
      )
    }
  }


}
