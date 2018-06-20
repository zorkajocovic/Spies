import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DemoServiceService } from '../demoService/demo-service.service';
import { Service } from '../models/service';
import { Vehicle } from '../models/vehicle';
import { BranchOffice } from '../models/branchoffice';
import { Comment } from '../models/comment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})

export class ServicesComponent implements OnInit {

  services: Service[];
  vehicles: Vehicle[];
  branches: BranchOffice[];
  comments: Comment[];

  constructor(private service: DemoServiceService, private router: Router) {
    this.services = [];
    this.vehicles = [];
    this.branches = [];
    this.comments = [];
  }

  ngOnInit() {
    this.allServices();
  }

  allServices() {
    this.service.getAllServices().subscribe(
      data => {
        this.services = data;
      },
      error => {
        alert("nije uspelo")
      })
  }

  deleteService(serviceId: number) {
    debugger
    for (var i = 0; i < this.services.length; i++) {
      if (this.services[i].Id == serviceId) {
        this.services[i].Deleted = true;
        this.service.updateService(this.services[i].Id, this.services[i]).subscribe(
          data => {},
          error => {
            alert("nije uspelo")
          });
      }
    }
  
    this.service.getAllVehiclesForService(serviceId).subscribe(
      data => {
        debugger
        this.vehicles = data;
        for (var i = 0; i < this.vehicles.length; i++) {
          if (this.vehicles[i].ServiceId == serviceId) {
            this.vehicles[i].Deleted = true;
            this.service.updateVehicle(this.vehicles[i].VehicleID, this.vehicles[i]).subscribe(
              data => {}
            );
          }
        }
      },
      error => {
        alert("nije uspelo")
      });

    this.service.getAllBranchesForService(serviceId).subscribe(
      data => {
        debugger
        this.branches = data;
        for (var i = 0; i < this.branches.length; i++) {
          if (this.branches[i].ServiceID == serviceId) {
            this.branches[i].Deleted = true;
            this.service.updateBranch(this.branches[i].BranchOfficeID, this.branches[i]).subscribe(
              data => {}
            );
          }
        }
      },
      error => {
        alert("nije uspelo")
      });
   

    this.service.getAllCommentsForService(serviceId).subscribe(
      data => {
        debugger
        this.comments = data;
        for (var i = 0; i < this.comments.length; i++) {
          if (this.comments[i].ServiceID == serviceId) {
            this.comments[i].Deleted = true;
          }
        }
        this.service.updateComment(this.comments[i].CommentID, this.comments[i]).subscribe(
          data => {}
        );
      },
      error => {
        alert("nije uspelo")
      });
   
  
      
    this.router.navigate(['services']);



  }
}
}
