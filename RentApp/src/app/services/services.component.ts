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
        this.service.deleteService(this.services[i].Id, this.services[i]).subscribe(
          data => {
            this.allServices();
            this.router.navigate(['services']);
          },
          error => {
            alert("nije uspelo")
          });
      }
    }
  }

  isManager(){
    return localStorage.role == 'Manager' ?  true : false;
  }
}
