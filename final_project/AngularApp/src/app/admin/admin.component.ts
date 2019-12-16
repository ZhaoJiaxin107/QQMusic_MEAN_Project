import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { SongService } from '../shared/song.service';
import { Song } from '../shared/song.model';
import { Observable } from 'rxjs';
import { MatSort,MatSortable,MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers:[SongService,UserService]
})
export class AdminComponent implements OnInit {
  userLists: Object;
  changeAdmin = true;
  changeActivate=true;
  listData:MatTableDataSource<any>;
  displayedColumns:string[]=['status','title','artist','option']

  constructor(private userService:UserService,
              private router:Router,
              private songService:SongService) { }
  
  @ViewChild(MatSort,null) sort:MatSort;

  ngOnInit() {
    this.getAllUsers();
    this.refreshSongList();
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

  AdmindeActivate(user){
    console.log(user);
    this.userService.setDeActiveAdmin(user._id,this.changeActivate).subscribe(
      res=>{
        console.log("Deactivate successfully");
      }
    )
  }

  refreshSongList(){
    this.songService.getSongList().subscribe(data=>{
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
    });
  }

 

}
