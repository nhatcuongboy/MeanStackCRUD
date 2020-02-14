import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EquipmentService } from 'src/app/shared/equipment.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Equipment } from 'src/app/shared/equipment';

@Component({
  selector: 'app-edit-equipment',
  templateUrl: './edit-equipment.component.html',
  styleUrls: ['./edit-equipment.component.css']
})
export class EditEquipmentComponent implements OnInit {

  editForm: FormGroup;

  submitted = false;
  employeeData: Equipment[];
  userList: any = []


  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    public authService: AuthService,
    public equipService: EquipmentService,
    public router: Router
  ) {
    this.authService.getUsers().subscribe(
      (res) => {
        this.userList = res
        //console.log(this.userList)
      }, (error) => {
        console.log(error);
      });
  }

  ngOnInit() {
    //this.updateEquipment();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getEquipment(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      type: ['pc', [Validators.required]],
      status: ['new', [Validators.required]],
      description: [''],
      assign: ['']
    })
  }

  // Choose options with select-dropdown
  updateAssign(e) {
    this.editForm.get('assign').setValue(e, {
      onlySelf: true
    })
  }

  // Getter method to access formcontrols
  get myForm() {
    return this.editForm.controls;
  }

  getEquipment(id) {
    this.equipService.getByID(id).subscribe(data => {
      this.editForm.setValue({
        name: data['name'],
        type: data['type'],
        status: data['status'],
        description: data['description'],
        assign: data['assign']
      });
    });
  }
  // updateEquipment() {
  //   this.editForm = this.fb.group({
  //     name: ['', [Validators.required]],
  //     type: ['', [Validators.required]],
  //     status: ['', [Validators.required]],
  //     description: [''],
  //     assign: ['']
  //   })
  // }

  editEquipment() {
    this.submitted = true;
    if (!this.editForm.valid) {
      alert('Please fill all the required fields!')
      return false;
    } else {
      let id = this.actRoute.snapshot.paramMap.get('id');
      this.equipService.edit(id, this.editForm.value)
        .subscribe(res => {
          this.router.navigateByUrl('/equipments');
          console.log('Content updated successfully!')
        }, (error) => {
          console.log(error)
        })
    }
  }

}
