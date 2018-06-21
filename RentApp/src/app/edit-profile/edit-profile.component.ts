import { Component, OnInit } from '@angular/core';
import { ActiveUser } from '../models/ActiveUser.model';
import { NgForm } from '@angular/forms';
import { DemoServiceService } from '../demoService/demo-service.service';
<<<<<<< HEAD
=======

>>>>>>> 5110d1dbb970d41ce28499b838be08c48eae03fb

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit {

<<<<<<< HEAD

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
=======
  activeUser: ActiveUser;
  activeUserId: number = -1;
  url: string;
  selectedFile: string;
 // public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  constructor(private service: DemoServiceService) { 
   // this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false;};
  //  this.uploader.onCompleteItem = (item: any, response: any,status: any, headers: any) => {
       // this.url=JSON.parse(response);        
    }
  

  ngOnInit() {
    this.service.getMethodDemo("http://localhost:51111/api/GetActiveUserId").subscribe(
      data => {
        this.activeUserId = data;
        this.service.getMethodDemo("http://localhost:51111/api/AppUsers/" + this.activeUserId).subscribe(
          data => {
            this.activeUser = data;
          })
      })
  }

  onSubmit(form: NgForm) {
      this.service.updateProfile(this.activeUserId, this.activeUser).subscribe(
        data => {
          alert("Uspelo")
        },
        error => {
          alert("nije uspelo")
        });
    
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
      debugger
      this.selectedFile = event.target.files[0];
      this.activeUser.Image = this.url

    }
  }

  handleUpload(data): void{
    if(data && data.response){
      data = JSON.parse(data.response);
      //this.uploadFile = data;
    }
  }
>>>>>>> 5110d1dbb970d41ce28499b838be08c48eae03fb
}