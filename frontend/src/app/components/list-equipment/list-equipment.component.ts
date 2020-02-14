import { Component, OnInit } from '@angular/core';
import { EquipmentService } from 'src/app/shared/equipment.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-equipment',
  templateUrl: './list-equipment.component.html',
  styleUrls: ['./list-equipment.component.css']
})
export class ListEquipmentComponent implements OnInit {
  assignment: string;
  Equipment: any = [];
  userList: any = [];
  constructor(
    public equipService: EquipmentService,
    public authService: AuthService,
    public router: Router
  ) {
    this.authService.getUsers().subscribe(
      (res) => {
        this.userList = res
      }, (error) => {
        console.log(error);
      });
    if (this.authService.isAdmin) {
      this.assignment = "all"
    } else {
      this.assignment = this.authService.getId
    }
    this.updateAssignment()
  }

  ngOnInit() {
  }

  deleteEquipment(equip, index) {
    if (window.confirm('Are you sure?')) {
      this.equipService.delete(equip._id).subscribe((data) => {
        this.Equipment.splice(index, 1);
      }
      )
    }
  }
  getAll() {
    this.equipService.getAll().subscribe(
      (res) => {
        this.Equipment = res
        //console.log(this.Equipment)
      }, (error) => {
        console.log(error);
      });
  }
  updateAssignment() {
    if (this.assignment === "all") {
      this.getAll()
    } else {
      this.equipService.getByAssignment(this.assignment).subscribe(
        (res) => {
          this.Equipment = res
        }, (error) => {
          console.log(error);
        });
    }
  }
}
