import { Component, OnInit } from '@angular/core';
import { BranchOffice } from '../models/branchoffice';
import { NgForm } from '@angular/forms';
import { DemoServiceService } from '../demoService/demo-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-branch-office',
  templateUrl: './branch-office.component.html',
  styleUrls: ['./branch-office.component.css']
})

export class BranchOfficeComponent implements OnInit {

  serviceId: number;

  constructor(private service: DemoServiceService, private activatedRoute: ActivatedRoute, private router: Router) { 
    debugger
    this.activatedRoute.params.subscribe(params => {this.serviceId = params["Id"]});    //Id je definisano u appmodule.ts kod path: "service/Id"
    this.allBranches(this.serviceId);
  }

  url: string = '';
  selectedFile: string;
  branches: BranchOffice[];

  ngOnInit() {
  }

  
  deleteBranch(id: number){

  for(var i=0; i<this.branches.length; i++){
   if(this.branches[i].BranchOfficeID == id){
     this.branches[i].Deleted = true;
     this.service.updateBranch(this.branches[i].BranchOfficeID, this.branches[i]).subscribe(
      data => {
        alert("Uspesno obrisana filijala!");
        this.router.navigate(['branches/' + this.serviceId]);
      },
      error => {
        alert("nije uspelo")
      }); 
   } 
  }
}

  allBranches(id){
    this.service.getAllBranchesForService(id).subscribe(
      data => {
        this.branches = data;
      },
      error => {
        alert("nije uspelo")
      })
    }
}
