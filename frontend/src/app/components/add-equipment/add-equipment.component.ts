import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipmentService } from 'src/app/shared/equipment.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})
export class AddEquipmentComponent implements OnInit {
  submitted = false
  createForm: FormGroup;
  userList: any = []
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public equipService: EquipmentService,
    public router: Router
  ) {
    this.createForm = this.fb.group({
      name: ['', [Validators.required]],
      type: ['pc', [Validators.required]],
      status: ['new', [Validators.required]],
      description: [''],
      assign: ['']
    })
    this.authService.getUsers().subscribe(
      (res) => {
        this.userList = res
        //console.log(this.userList)
      }, (error) => {
        console.log(error);
      });
  }

  ngOnInit() {

  }
  // Choose options with select-dropdown
  updateAssign(e) {
    this.createForm.get('assign').setValue(e, {
      onlySelf: true
    })
  }
  createEquipment() {

    //this.equipService.create(this.createForm.value);
    this.submitted = true;
    if (!this.createForm.valid) {
      alert('Please fill all the required fields!')
      return false;
    } else {
      this.equipService.create(this.createForm.value).subscribe((res: any) => {

        this.router.navigate(['equipments']);
      }, (error) => {
        if (error.status === 500) {
          alert("Duplicated name")
        } else { 
          console.log(error);
        }
      })
    }
  }

  // Getter method to access formcontrols
  get myForm() {
    return this.createForm.controls;
  }

}
