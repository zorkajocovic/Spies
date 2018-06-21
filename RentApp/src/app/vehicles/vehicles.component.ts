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
import { ActiveUser } from '../models/ActiveUser.model';

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
  users: ActiveUser[];
  userNames: string[];
  vehicleTypes: VehicleType[];
  isVisible: boolean = false;
  deleteId: number;


  constructor(private service: DemoServiceService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(params => { this.serviceId = params["Id"] });    //Id je definisano u appmodule.ts kod path: "service/Id"
    this.allVehicles('http://localhost:51111/api/GetVehiclesForService/' + this.serviceId);
    this.getAllCommentsForService(this.serviceId);
    this.allVehicleType('http://localhost:51111/api/VehicleType');
  }

  ngOnInit() {
  }

  allVehicles(path: string) {
    this.service.getMethodDemo(path).subscribe(
      data => {
        this.vehicles = data;
        // alert("uspelo")
      },
      error => {
        alert("nije uspelo")
      })
  }

  SendRate() {
    debugger
    this.service.getMethodDemo("http://localhost:51111/api/GetActiveUserId").subscribe(
      data => {
        this.rate.ClientID = data
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
      })
  }

  getAllCommentsForService(serviceId: number) {
    this.service.getMethodDemo(serviceId).subscribe(
      data => {

        this.comments = data;
        for (var i = 0; i < this.comments.length; i++) {

          this.service.getMethodDemo('http://localhost:51111/api/AppUsers/' + this.comments[i].ClientID).subscribe(
            data => {
              this.users = data;
            },
            error => {
              alert("nije uspelo ovo")
            })

        }
        for (var i = 0; i < this.users.length; i++) {
          this.userNames.push(this.users[i].FullName);
        }

      })
  }

  deleteVehicle(id: number) {

    debugger
    for (var i = 0; i < this.vehicles.length; i++) {
      if (this.vehicles[i].VehicleID == id) {
        debugger
        this.vehicles[i].Deleted = true;
        this.service.updateVehicle(this.vehicles[i].VehicleID, this.vehicles[i]).subscribe(
          data => {
            debugger
            alert("Uspesno obrisano auto!")
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

        this.service.postMethodDemo("http://localhost:51111/api/CommentsForService", comment.ServiceID).subscribe(
          data => {
            this.getAllCommentsForService(comment.ServiceID);
          },
          error => {
            alert("nije uspelo")
          });
      })

    form.reset();

  }


  allVehicleType(path: string) {
    this.service.getMethodDemo(path).subscribe(
      data => {
        this.vehicleTypes = data;
        // alert("uspelo")
      },
      error => {
        alert("nije uspelo")
      })
  }

  toggle(): void {
    this.isVisible = !this.isVisible;
  }


  DeleteVehicleType(id: number) {
    for (var i = 0; i < this.vehicleTypes.length; i++) {
      if (this.vehicleTypes[i].VehicleTypeId == id) {
        this.vehicleTypes[i].Deleted = true;

        this.service.updateVehicleType(this.vehicleTypes[i].VehicleTypeId, this.vehicleTypes[i]).subscribe(
          data => {
            alert("Uspesno obrisan tip!")
            this.allVehicleType('http://localhost:51111/api/VehicleType');
            debugger
          },
          error => {
            alert("nije uspelo")
          });
      }
    }

  }
}
