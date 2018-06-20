import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs';    
import { AppUser } from '../models/AppUser.model'
import { BranchOffice } from '../models/branchoffice';
import { Vehicle } from '../models/vehicle';
import { Comment } from '../models/comment';
import { Service } from '../models/service';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})

export class DemoServiceService {

  private messageSource = new BehaviorSubject<boolean>(false);
  currentLoginState = this.messageSource.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) { }

  changeLoginState(state: boolean){
    this.messageSource.next(state);
  }
  
  getMethodDemo(path): Observable<any> {
    return this.httpClient.get(path);
  }

  getAllBranches(): Observable<any> {
    return this.httpClient.get("http://localhost:51111/api/BranchOffice");
  }

  getAllServices(): Observable<any> {
    return this.httpClient.get("http://localhost:51111/api/Services");
  }
  
  getAllVehiclesForService(serviceId): Observable<any> {
    return this.httpClient.get("http://localhost:51111/api/GetVehicleForService/" + serviceId);
  }
  
  getAllBranchesForService(serviceId): Observable<any> {
    return this.httpClient.get("http://localhost:51111/api/GetBranchOfficeForService/"+ serviceId);
  }

  getAllCommentsForService(serviceId): Observable<any> {
    return this.httpClient.get("http://localhost:51111/api/GetCommentsForService/ " + serviceId);
  }

  postMethodDemo(path, newMember): Observable<any> {
    return this.httpClient.post(path, newMember)
  }

  updateService(id: number, newMember: Service): Observable<any> {
    return this.httpClient.put("http://localhost:51111/api/Services/" + id, newMember)
  }

  updateBranch(id: number, newMember: BranchOffice): Observable<any> {
    return this.httpClient.put("http://localhost:51111/api/BranchOffice/" + id, newMember)
  }

  updateVehicle(id: number, newMember: Vehicle): Observable<any> {
    return this.httpClient.put("http://localhost:51111/api/Vehicle/" + id, newMember)
  }

  updateComment(id: number, newMember: Comment): Observable<any> {
    return this.httpClient.put("http://localhost:51111/api/Comment/" + id, newMember)
  }

  getTheToken(user){

    let headers = new HttpHeaders();
    headers = headers.append('Content-type', 'application/x-www-form-urlencoded');
    
    if(!localStorage.jwt)
    {
       let x = this.httpClient.post('http://localhost:51111/oauth/token',`username=${user.username}&password=${user.password}&grant_type=password`, {"headers": headers}) as Observable<any>

    x.subscribe(
        res => {
          console.log(res.access_token);
          
          let jwt = res.access_token;

          let jwtData = jwt.split('.')[1]
          let decodedJwtJsonData = window.atob(jwtData)
          let decodedJwtData = JSON.parse(decodedJwtJsonData)

          let role = decodedJwtData.role

          localStorage.setItem('jwt', jwt)
          localStorage.setItem('role', role);

          this.changeLoginState(true);
          this.router.navigate(['services']);
        },
        err => {
          alert("Pogresna sifra ili username!");

        }
      );
    }
  }
}
