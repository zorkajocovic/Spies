import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Vehicle } from '../models/vehicle';
import { DemoServiceService } from '../demoService/demo-service.service';
import { VehiclesReserveComponent } from '../vehicles-reserve/vehicles-reserve.component'
import { Rate } from '../models/rate';
import { NgForm } from '@angular/forms';
import { Comment } from '../models/comment';
import { AppUser } from '../models/AppUser.model';
import { Router } from '@angular/router';
import { VehicleType } from '../models/vehicle-type';
import { IsAdmin } from '../guard/auth.admin';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})

export class VehiclesComponent implements OnInit {

  vehicles: Vehicle[];
  comments: Comment[];
  showSpecificReservation = -1;
  serviceId: number = -1;
  star5: string;;
  star4: string;
  star3: string;
  star2: string;
  star1: string;
  rate: Rate;
  UserID: number;
  users: AppUser[];
  userNames: string[];
  deleteId: number;
  isVisible: boolean = false;
  vehicleTypes: VehicleType[];
  isOn: boolean[];

  constructor(private service: DemoServiceService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(params => { this.serviceId = params["Id"] });    //Id je definisano u appmodule.ts kod path: "service/Id"
    this.allVehicles();
    this.allComments(this.serviceId);
    this.allVehicleTypes('http://localhost:51111/api/VehicleType');

  }

  ngOnInit() {
  }

  allVehicles() {
    this.service.getAllVehiclesForService(this.serviceId).subscribe(
      data => {
        debugger
        this.vehicles = data;
        // alert("uspelo")
      },
      error => {
        alert("nije uspelo")
      })
  }

  SendRate(num) {
    debugger
    this.service.getRateForService(this.serviceId).subscribe(
      data=>{
        this.rate=data;
        debugger
        if(this.rate.RateID==0){
            for(var i=0; i<num; i++){
              this.isOn[i]=true;
            }
          debugger
      this.service.getMethodDemo("http://localhost:51111/api/GetActiveUserId").subscribe(
      data => {
            this.rate.ClientID = data;
            this.rate.SerId = this.serviceId;

      this.service.postMethodDemo("http://localhost:51111/api/Rate", this.rate).subscribe(
        data => {
        },
        error => {
          alert("nije uspelo")
        });
      })           
        }
      }
    )


   /* debugger
    this.service.getMethodDemo("http://localhost:51111/api/GetActiveUserId").subscribe(
      data => {
        this.rate.ClientID = data
        debugger
        this.rate.SerId = this.serviceId
        if (this.star5 == "5") {
          this.rate.Value = 5;
        } else if (this.star4 == "4") {
          this.rate.Value = 4;
        } else if (this.star3 == "3") {
          this.rate.Value = 3;
        } else if (this.star2 == "2") {
          this.rate.Value = 2;
        } else {
          this.rate.Value = 1;
        }

        this.service.postMethodDemo('http://localhost:51111/api/Rate', this.rate).subscribe(
          data => {
          },
          error => {
            alert("nije uspelo")
          });
      })*/
  }

  allComments(num: number) {
    debugger
    this.service.getAllCommentsForService(num).subscribe(
      data => {
        this.comments = data;

      })
      debugger
  
}

  deleteVehicle(id: number) {
    for (var i = 0; i < this.vehicles.length; i++) {
      if (this.vehicles[i].VehicleID == id) {
        this.vehicles[i].Deleted = true;
        this.service.updateVehicle(this.vehicles[i].VehicleID, this.vehicles[i]).subscribe(
          data => {
            alert("Uspesno obrisano auto!");
            this.allVehicles();
            this.router.navigate(['services/' + this.serviceId]);
          },
          error => {
            alert("nije uspelo")
          });
      }
    }
  }

  AddComment(comment: Comment, form: NgForm) {
    this.service.getMethodDemo("http://localhost:51111/api/GetActiveUserId").subscribe(
      data => {
        this.UserID = data;

        comment.ClientID = this.UserID;
        comment.ServiceID = this.serviceId;

        this.service.postMethodDemo("http://localhost:51111/api/Comment", comment).subscribe(
          data => {
            this.allComments(this.serviceId);
          },
          error => {
            alert("nije uspelo")
          });
      })

    form.reset();

  }

  toggle(): void {
    this.isVisible = !this.isVisible;
  }

  allVehicleTypes(path: string) {
    this.service.getMethodDemo(path).subscribe(
      data => {
        this.vehicleTypes = data;
        // alert("uspelo")
        debugger
      },
      error => {
        alert("nije uspelo")
      })
  }

  DeleteVehicleType(id: number) {
    debugger
    for (var i = 0; i < this.vehicleTypes.length; i++) {
      if (this.vehicleTypes[i].VehicleTypeId == id) {
        this.vehicleTypes[i].Deleted = true;

        this.service.updateVehicleType(this.vehicleTypes[i].VehicleTypeId, this.vehicleTypes[i]).subscribe(
          data => {
            alert("Uspesno obrisan tip!")
            this.allVehicleTypes('http://localhost:51111/api/VehicleType');
            debugger
          },
          error => {
            alert("nije uspelo")
          });
      }
    }
  }

}
