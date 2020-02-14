import { Component, OnInit } from '@angular/core';
import { EquipmentService } from 'src/app/shared/equipment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-view-equipment',
  templateUrl: './view-equipment.component.html',
  styleUrls: ['./view-equipment.component.css']
})
export class ViewEquipmentComponent implements OnInit {

  Equipment: any = {}
  constructor(
    public equipService: EquipmentService,
    public router: Router,
    private actRoute: ActivatedRoute,
    public authService: AuthService,
  ) {
    this.getData()
  }

  ngOnInit() {
  }
  getData() {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.equipService.getByID(id).subscribe((res) => {
      this.Equipment = res;
      if (res.assign) {
        this.authService.getUserProfile(res.assign).subscribe(res => {
          this.Equipment.assign = res.msg.name;
        })
      } else {
        this.Equipment.assign = "Nobody"
      }
    }, (error) => {
      console.log(error);
    })

  }

  deleteAssignment(equip) {
    if (window.confirm('Are you sure?')) {
      // this.equipService.delete(equip._id).subscribe(
      //   (res) => {
      //     console.log("OK");
      //     this.router.navigate(['equipments'])
      //   }, (error) => {
      //     console.log(error);
      //   })
      this.equipService.edit(equip._id, { "assign": "" })
        .subscribe(res => {
          //this.router.navigateByUrl('/equipments');
          this.Equipment.assign = "Nobody"
          alert('Unassign successfully!')
        }, (error) => {
          console.log(error)
        })
    }
  }

}
