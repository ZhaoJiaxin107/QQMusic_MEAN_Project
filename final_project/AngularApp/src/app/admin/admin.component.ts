import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userLists: Object;
  changeAdmin = true;
  changeActivate=true;
  constructor(private userService:UserService,
              private router:Router) { }

  ngOnInit() {
    this.getAllUsers()
  }

  getAllUsers(){
    this.userService.getallUsers().subscribe(
      res => {
        this.userLists = res;
        console.log(this.userLists);
      },
      err=>{}
    )
  }
  editAdmin(user) {
    console.log(user);
    this.userService.grantAdmin(user._id,this.changeAdmin).subscribe(
      res=>{
      
        console.log("update successfully");
      }
    )
  }

  AdminActivate(user) {
    console.log(user);
    this.userService.setActiveAdmin(user._id,this.changeActivate).subscribe(
      res=>{
        console.log("activate successfully");
      }
    )
  }

}
