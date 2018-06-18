import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import { Vehicle } from '../models/vehicle';
import { DemoServiceService } from '../demoService/demo-service.service';
import { VehiclesReserveComponent } from '../vehicles-reserve/vehicles-reserve.component'
import { Rate } from '../models/rate';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})

export class VehiclesComponent implements OnInit {

  vehicles: Vehicle[];
  showSpecificReservation = -1;
  serviceId: number = -1;
  star5: number;
  star4: number;
  star3: number;
  star2: number;
  star1: number;
  data: Rate;

  constructor(private service: DemoServiceService, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe(params => {this.serviceId = params["Id"]});    //Id je definisano u appmodule.ts kod path: "service/Id"
    this.allVehicles('http://localhost:51111/api/GetVehiclesForService/' + this.serviceId);

  }

  ngOnInit() {
  }

  allVehicles(path: string){
    this.service.getMethodDemo(path).subscribe(
      data => {
        this.vehicles = data;
       // alert("uspelo")
      },
      error => {
        alert("nije uspelo")
      })
    }

    SendRate(){   
    debugger
    if(this.star5 == 5){
      this.data.Value=5;
    }else if(this.star4 == 4){
      this.data.Value=4;
    }else if(this.star3 == 3){
      this.data.Value=3;
    }else if(this.star2 == 2){
      this.data.Value=2;
    }else{
      this.data.Value=1;
    }

      this.service.postMethodDemo('http://localhost:51111/api/Rate', this.data).subscribe(
        data => {

        },
        error => {
          alert("nije uspelo")
        })
    }
}
