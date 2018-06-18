import { Component, OnInit } from '@angular/core';
import { VehicleType } from '../models/vehicle-type';
import { DemoServiceService } from '../demoService/demo-service.service';
import { Vehicle } from '../models/vehicle';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-make-vehicle',
  templateUrl: './make-vehicle.component.html',
  styleUrls: ['./make-vehicle.component.css']
})

export class MakeVehicleComponent implements OnInit {

  types: VehicleType[];
  url: string;
  selectedFile: string;
  selectedType: number;
  serviceId: number = -1;
  selectedYear: number = -1;
  yesNo: string[];
  years: number[];
  available: string;
  isVisible: boolean = false;

  constructor(private service: DemoServiceService, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.types = [];
    this.years = [];
    this.yesNo = ["Yes", "No"];
    for(var i=1995; i<2018; i++){
      this.years.push(i);
    }

    this.activatedRoute.params.subscribe(params => {this.serviceId = params["Id"]});
  }

  
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
       var reader = new FileReader();

       reader.readAsDataURL(event.target.files[0]); // read file as data url

       reader.onload = (event) => { // called once readAsDataURL is completed
         this.url = event.target.result;
       }

      this.selectedFile = event.target.files[0]
    }
  }

  allVehicleTypes(path: string){
    this.service.getMethodDemo(path).subscribe(
      data => {
        this.types = data;
      },
      error => {
        alert("nije uspelo")
      })
  }

  ngOnInit() {
    this.allVehicleTypes('http://localhost:51111/api/VehicleType');
  }

  SaveVehicle(newVehicle: Vehicle, form: NgForm){

    newVehicle.ServiceId = this.serviceId;
    this.available == "Yes" ? newVehicle.Available = true : newVehicle.Available = false;
    newVehicle.ProductionYear = this.selectedYear;
    debugger
    let body = new FormData();
    body.append('image', this.selectedFile)
    body.append('vehicle', JSON.stringify(newVehicle))

    this.service.postMethodDemo("http://localhost:51111/api/Vehicle", body).subscribe(
      data => {
        alert("Uspesno ste dodali vozilo!")
        this.router.navigate(['services/' + this.serviceId]);
      },
      error => {
        alert("nije uspelo")
      });

    this.url = "";  
    form.reset();
  }

  toggle():void {
    this.isVisible = !this.isVisible;
  }

  SaveType(newVehicleType: VehicleType, form: NgForm){
    this.isVisible = !this.isVisible;
    this.service.postMethodDemo("http://localhost:51111/api/VehicleType", newVehicleType).subscribe(
      data => {
        alert("Uspesno ste dodali novi tip vozila!")
        this.router.navigate(['vehicles/' + this.serviceId]);
      },
      error => {
        alert("nije uspelo")
      });

    form.reset();
  }
}
