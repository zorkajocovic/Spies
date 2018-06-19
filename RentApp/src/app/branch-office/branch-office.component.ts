import { Component, OnInit } from '@angular/core';
import { BranchOffice } from '../models/branchoffice';
import { NgForm } from '@angular/forms';
import { DemoServiceService } from '../demoService/demo-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-branch-office',
  templateUrl: './branch-office.component.html',
  styleUrls: ['./branch-office.component.css']
})

export class BranchOfficeComponent implements OnInit {

  serviceId: number;

  constructor(private service: DemoServiceService, private activatedRoute: ActivatedRoute) { 
    debugger
    this.activatedRoute.params.subscribe(params => {this.serviceId = params["Id"]});    //Id je definisano u appmodule.ts kod path: "service/Id"
    this.allBranches('http://localhost:51111/api/GetBranchOfficesForService/' + this.serviceId);
  }

  url: string = '';
  selectedFile: string;
  branches: BranchOffice[];

  ngOnInit() {
  }

  allBranches(path: string){
    this.service.getMethodDemo(path).subscribe(
      data => {
        this.branches = data;
      },
      error => {
        alert("nije uspelo")
      })
    }
}
