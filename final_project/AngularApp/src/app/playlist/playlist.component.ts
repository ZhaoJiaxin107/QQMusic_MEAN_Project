import { Component, OnInit, ViewChild } from '@angular/core';
import { SongService } from '../shared/song.service';
import { Song } from '../shared/song.model';
import { Observable } from 'rxjs';
import { MatSort,MatSortable,MatTableDataSource} from '@angular/material';
import { filter } from 'rxjs/operators';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { Playlist } from '../shared/playlist.model';
import { PlaylistService } from '../shared/playlist.service';
import { UserService } from '../shared/user.service';
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
  providers:[SongService,PlaylistService]
})
export class PlaylistComponent implements OnInit {
  songTitle;
  songArtist;
  userDetails;
  username;
  constructor(private songService:SongService,
    private playlistService:PlaylistService,
    private userService:UserService,
    private router:Router) { }
  
  listData:MatTableDataSource<any>;
  displayedColumns:string[]=['title','artist','album','score','option']

  @ViewChild(MatSort,null) sort:MatSort;

  ngOnInit() {
    this.refreshSongList();
    this.userService.getUserProfile().subscribe(
      res=>{
        this.userDetails = res['user'];
        console.log(this.userDetails);
        this.username = this.userDetails.local.fullname;
        console.log(this.username);
      },
      
      err=>{}
    );
  }

  refreshSongList(){
    this.songService.getTrueSongList().subscribe(data=>{
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
    });
  }

  applyFilter(filtervalue:string){
    this.listData.filter = filtervalue.trim().toLocaleLowerCase();
  }

  onAdd(song){
    this.songTitle = song.title;
    this.songArtist = song.artist;
    console.log(this.songTitle,this.songArtist);
  }
  
  onSubmit(form: NgForm) {
    this.playlistService.postPlaylist(form.value).subscribe(
      res=>{
        console.log('Saved Successfully!');
    });
  }

}
