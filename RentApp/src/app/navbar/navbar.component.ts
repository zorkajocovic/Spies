import { Component, OnInit } from '@angular/core';
import { IsSomeLogged } from '../guard/auth.logged';
import { DemoServiceService } from '../demoService/demo-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  loggedIn: boolean;
  
  constructor(private logged: IsSomeLogged, private service: DemoServiceService) {
    this.service.currentLoginState.subscribe(loggedIn => this.loggedIn = loggedIn);
   }

  ngOnInit() {
    this.loggedIn = this.logged.canActivate();
  }

logOut(){
  localStorage.removeItem('jwt');
  localStorage.removeItem('role');
  this.loggedIn = this.logged.canActivate();

}

}
