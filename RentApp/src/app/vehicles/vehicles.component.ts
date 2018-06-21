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
import { IsClient } from '../guard/auth.client';
import { Service } from '../models/service';

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
  RateValue1: string;
  selectedRate: number;
  rates: number[];
  active: boolean;
  activeUser: number;
  filter: Vehicle;
  filterText: string = '';
  findedVehicles: Vehicle[];
  selectedType: number = -1;
  searchVehicles: Vehicle[];
  activeService: Service;

  constructor(private service: DemoServiceService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(params => { this.serviceId = params["Id"] });    //Id je definisano u appmodule.ts kod path: "service/Id"
    this.vehicles = this.allVehicles();
    this.allComments(this.serviceId);
    this.allVehicleTypes('http://localhost:51111/api/VehicleType');
    this.rates = [];
   this.searchVehicles=[];
  }

  ngOnInit() {
    for(var i=1; i<=5; i++){
      this.rates.push(i);
        }

  this.service.getCurrentUser().subscribe(
    data => {
      this.activeUser = data;
    },
    error => {
      alert("nije uspelo")
    })
  }

  selectSearch(event: any){
    this.filterText = event.target.value;
  }

CreatorOfService(){

  this.service.getService(this.serviceId).subscribe(
    data => {
      this.activeService = data;
    },
    error => {
      alert("nije uspelo")
    })
}



  filterBy(event: any){
    this.findedVehicles = [];
    debugger
    this.vehicles.forEach(veh => {
      debugger
     if(this.filterText == "Model"){
       debugger
       var lengthFilter = event.length;
        var brojEvent = veh.Model.substring(0, lengthFilter);

        if(brojEvent.toLowerCase() == event.toLowerCase()){
          this.findedVehicles.push(veh);
        }
     }
     else if(this.filterText == "Price"){
       debugger
        if(veh.PriceVehicle <= event){
          this.findedVehicles.push(veh);
        }
     }
     else if(veh.VehicleTypeId == event){
       debugger
         this.findedVehicles.push(veh);
       }
     
     else if(this.filterText == "Filtriraj po tipu vozila"){
      debugger
        this.findedVehicles = this.allVehicles();
     }
      else if(this.filterText == "Izaberite filter"){
        debugger
          this.findedVehicles = this.allVehicles();
     }
    // else if(this.selected == "Price"){

    // }
    }
    )
  }

  TextForSearch(event: any){
    debugger
      this.service.getSearchVehicle(event).subscribe(
        data => {
            this.searchVehicles=data;

        })
  }


  allVehicles() : Vehicle[]{
    this.service.geAllVehiclesForService(this.serviceId).subscribe(
      data => {
        debugger
        this.vehicles = data;
        // alert("uspelo")
      },
      error => {
        alert("nije uspelo")
      })
      return this.vehicles;
  }

  SendRate() {
    debugger  
    this.service.getMethodDemo("http://localhost:51111/api/GetActiveUserId").subscribe(
      data => {
            this.rate = new Rate(this.serviceId, this.selectedRate, data);;
            debugger
            this.service.postMethodDemo("http://localhost:51111/api/Rate", this.rate).subscribe(
              data => {
              },
              error => {
                alert("nije uspelo")
              });
      })
  }

  allComments(num: number) {
    this.service.getAllCommentsForService(num).subscribe(
      data => {
        this.comments = data;

      })
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
        debugger
      },
      error => {
        alert("nije uspelo")
      })
  }

  DeleteVehicleType(id: number) {
    for (var i = 0; i < this.vehicleTypes.length; i++) {
      if (this.vehicleTypes[i].VehicleTypeId == id) {
        this.vehicleTypes[i].Deleted = true;

        this.service.updateVehicleType(this.vehicleTypes[i].VehicleTypeId, this.vehicleTypes[i]).subscribe(
          data => {
            alert("Uspesno obrisan tip!")
            this.allVehicleTypes('http://localhost:51111/api/VehicleType');
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
  }
}
