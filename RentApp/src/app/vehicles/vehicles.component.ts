import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Vehicle } from '../models/vehicle';
import { DemoServiceService } from '../demoService/demo-service.service';
import { VehiclesReserveComponent } from '../vehicles-reserve/vehicles-reserve.component'
import { Rate } from '../models/rate';
import { NgForm, NumberValueAccessor } from '@angular/forms';
import { Comment } from '../models/comment';
import { AppUser } from '../models/AppUser.model';
import { Router } from '@angular/router';
import { VehicleType } from '../models/vehicle-type';
<<<<<<< HEAD
import { ActiveUser } from '../models/ActiveUser.model';
=======
import { IsAdmin } from '../guard/auth.admin';
import { IsClient } from '../guard/auth.client';
import { FilterPipePipe } from '../vehicles/filter-pipe.pipe';
>>>>>>> 5110d1dbb970d41ce28499b838be08c48eae03fb

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
<<<<<<< HEAD
  users: ActiveUser[];
=======
  users: AppUser[];
>>>>>>> 5110d1dbb970d41ce28499b838be08c48eae03fb
  userNames: string[];
  vehicleTypes: VehicleType[];
  isVisible: boolean = false;
  deleteId: number;
  isVisible: boolean = false;
  vehicleTypes: VehicleType[];
  isOn: boolean[];
<<<<<<< HEAD
  isAdmin: IsAdmin;
  RateValue1: string;
  selectedRate: number;
  rates: number[];
  
=======
  active: boolean;
  activeUser: number;
  filter: Vehicle;
  filterText: string;
  findedVehicles: Vehicle[];
>>>>>>> f844380f499caf3e2a567b402db39d2f102d3308


  constructor(private service: DemoServiceService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(params => { this.serviceId = params["Id"] });    //Id je definisano u appmodule.ts kod path: "service/Id"
<<<<<<< HEAD
    this.allVehicles('http://localhost:51111/api/GetVehiclesForService/' + this.serviceId);
    this.getAllCommentsForService(this.serviceId);
    this.allVehicleType('http://localhost:51111/api/VehicleType');
=======
    this.allVehicles();
    this.allComments(this.serviceId);
    this.allVehicleTypes('http://localhost:51111/api/VehicleType');
 
>>>>>>> 5110d1dbb970d41ce28499b838be08c48eae03fb
  }

  ngOnInit() {
<<<<<<< HEAD

    for(var i=0; i<4; i++){
        this.rates.push(i);
    }

=======
    this.service.getCurrentUser().subscribe(
      data => {
        this.activeUser = data;
      },
      error => {
        alert("nije uspelo")
      })
>>>>>>> f844380f499caf3e2a567b402db39d2f102d3308
  }

<<<<<<< HEAD
  allVehicles(path: string) {
    this.service.getMethodDemo(path).subscribe(
=======
  selectSearch(event: any){
    debugger
    this.filterText = event.target.value;
  }

  filterBy(event: any){
    this.findedVehicles = [];
    debugger
    this.vehicles.forEach(veh => {
      debugger
     if(this.filterText == "Model"){
       var lengthFilter = event.length;
        var brojEvent = veh.Model.substring(0, lengthFilter);

        if(brojEvent.toLowerCase() == event.toLowerCase()){
          this.findedVehicles.push(veh);
        }
     }
    // else if(this.selected == "Price"){

    // }
    }
    )
    
  }
  allVehicles() {
    this.service.getAllVehiclesForService(this.serviceId).subscribe(
>>>>>>> 5110d1dbb970d41ce28499b838be08c48eae03fb
      data => {
        debugger
        this.vehicles = data;
        // alert("uspelo")
      },
      error => {
        alert("nije uspelo")
      })
  }

  SendRate() {
    debugger
<<<<<<< HEAD
    this.service.getMethodDemo("http://localhost:51111/api/GetActiveUserId").subscribe(
      data => {
        this.rate.ClientID = data
=======
    
    this.rate.Value = this.selectedRate;
    this.rate = new Rate(this.serviceId);

    this.service.getMethodDemo("http://localhost:51111/api/GetActiveUserId").subscribe(
      data => {
            this.rate.ClientID = data;
            this.rate = new Rate(this.serviceId);

            this.service.postMethodDemo("http://localhost:51111/api/Rate", this.rate).subscribe(
              data => {
              },
              error => {
                alert("nije uspelo")
              });
      })




    /*this.service.getRateForService(this.serviceId).subscribe(
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
*/

   /* debugger
    this.service.getMethodDemo("http://localhost:51111/api/GetActiveUserId").subscribe(
      data => {
        this.rate.ClientID = data
        debugger
>>>>>>> 5110d1dbb970d41ce28499b838be08c48eae03fb
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
<<<<<<< HEAD
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

=======
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

  isClient(){
    return localStorage.role == 'AppUser' ?  true : false;
  }

  isManager(){
    return localStorage.role == 'Manager' ?  true : false;
  }

  isAdmin(){
    return localStorage.role == 'Admin' ?  true : false;
>>>>>>> 5110d1dbb970d41ce28499b838be08c48eae03fb
  }
}
