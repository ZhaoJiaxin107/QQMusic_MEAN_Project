import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../shared/playlist.service';
import { Playlist } from '../shared/playlist.model';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { UpdateplaylistComponent} from '../updateplaylist/updateplaylist.component';

import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-playlistdetail',
  templateUrl: './playlistdetail.component.html',
  styleUrls: ['./playlistdetail.component.css'],
  providers:[PlaylistService]
})
export class PlaylistdetailComponent implements OnInit {
  playlistid;
  title;
  artist;
  show  = true;
  hidden = false;
  constructor(private playlistService:PlaylistService,private router:Router,
    private dialog:MatDialog,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.refreshPlaylist();
  }

  refreshPlaylist(){
    this.playlistService.getPlaylist().subscribe((res)=>{
      this.playlistService.playlists = res as Playlist[];
      console.log(this.playlistService.playlists);
    });
  }
  
  onDelete(play:Playlist){
    console.log(play.title);
    if(confirm('Are you sure to delete this record?') == true){
      this.playlistService.deletePlaylist(play).subscribe((res)=>{
        this.refreshPlaylist();
        console.log("Deleted Successfully!");
      });
    }
  }

  onEdit(play:Playlist){
    this.playlistService.selectedPlaylist = play;
    this.router.navigate(['/updateplaylist',play._id]);
  }

}
