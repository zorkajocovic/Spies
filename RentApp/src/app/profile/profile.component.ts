import { Component, OnInit } from '@angular/core';
import { DemoServiceService } from '../demoService/demo-service.service';
import { ActiveUser } from '../models/ActiveUser.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  user: ActiveUser;
  activeId: number = -1;

  constructor(private service: DemoServiceService) {
    debugger
    this.service.getMethodDemo("http://localhost:51111/api/GetActiveUserId").subscribe(
      data => {
        this.activeId = data;
        debugger
        this.service.getMethodDemo("http://localhost:51111/api/AppUsers/" + this.activeId).subscribe(
          data => {
            this.user = data;
            debugger
          });
      });
   }

  ngOnInit() {
  
  }
 
}
