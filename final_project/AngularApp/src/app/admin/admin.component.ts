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
  changeAdmin: string;
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

}
