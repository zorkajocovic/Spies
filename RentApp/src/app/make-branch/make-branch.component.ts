import { Component, OnInit, Input } from '@angular/core';
import { BranchOffice } from 'src/app/models/branchoffice';
import { NgForm } from '@angular/forms';
import { DemoServiceService } from '../demoService/demo-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-make-branch',
  templateUrl: './make-branch.component.html',
  styleUrls: ['./make-branch.component.css']
})
export class MakeBranchComponent implements OnInit {

  branches: BranchOffice[];
  selectedFile: "";
  url: "";
  serviceId: number;

  constructor(private service: DemoServiceService, private activatedRoute: ActivatedRoute, private router: Router) { 
    this.activatedRoute.params.subscribe(params => {this.serviceId = params["Id"]});
  }

  ngOnInit() {
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
  
  onSubmit(newBranch: BranchOffice, form: NgForm){

    debugger
    newBranch.ServiceID = this.serviceId;
    let body = new FormData();
    body.append('image', this.selectedFile)
    body.append('branch', JSON.stringify(newBranch))

    this.service.postMethodDemo("http://localhost:51111/api/BranchOffice", body).subscribe(
        data => {
          alert("Uspesno ste se dodali novu filijalu!")
          this.router.navigate(['branches/' + this.serviceId]);
        },
        error => {
          alert("nije uspelo")
        })


    this.url = "";  
    form.reset();
  }

}
