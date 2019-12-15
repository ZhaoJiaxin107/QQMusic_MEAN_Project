import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../shared/playlist.service';
import { Playlist } from '../shared/playlist.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlistdetail',
  templateUrl: './playlistdetail.component.html',
  styleUrls: ['./playlistdetail.component.css'],
  providers:[PlaylistService]
})
export class PlaylistdetailComponent implements OnInit {

  constructor(private playlistService:PlaylistService,private router:Router) { }

  ngOnInit() {
    this.refreshPlaylist();
  }

  refreshPlaylist(){
    this.playlistService.getPlaylist().subscribe((res)=>{
      this.playlistService.playlists = res as Playlist[];
      console.log(this.playlistService.playlists);
    });
  }
  
  onDelete(_id:string){
    if(confirm('Are you sure to delete this record?') == true){
      this.playlistService.deletePlaylist(_id).subscribe((res)=>{
        this.refreshPlaylist();
        console.log("Deleted Successfully!");
      });
    }
  }

}
