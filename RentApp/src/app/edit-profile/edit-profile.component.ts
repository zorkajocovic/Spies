import { Component, OnInit } from '@angular/core';
import { ActiveUser } from '../models/ActiveUser.model';
import { NgForm } from '@angular/forms';
import { DemoServiceService } from '../demoService/demo-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {


  activeUser: ActiveUser;
  activeUserId: number = -1;

  constructor(private service: DemoServiceService) { }

  ngOnInit() {
    debugger
    this.service.getMethodDemo("http://localhost:51111/api/GetActiveUserId").subscribe(
      data =>{
        this.activeUserId = data;
        debugger
        this.service.getMethodDemo("http://localhost:51111/api/AppUsers/" + this.activeUserId).subscribe(
          data =>{
            this.activeUser = data;
            debugger
          })
      })
    
  }

  onSubmit(activeUser:  ActiveUser, form: NgForm){
    debugger
    this.service.updateProfile("http://localhost:51111/api/AppUsers/" + this.activeUserId, this.activeUser).subscribe(
      data => {
        debugger
        alert("Uspelo")
      },
      error => {
        alert("nije uspelo")       
        });

    }
}