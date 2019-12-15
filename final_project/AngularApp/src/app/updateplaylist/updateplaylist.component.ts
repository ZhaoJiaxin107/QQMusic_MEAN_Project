import { Component, OnInit } from '@angular/core';
import { Playlist } from '../shared/playlist.model';
import { PlaylistService } from '../shared/playlist.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-updateplaylist',
  templateUrl: './updateplaylist.component.html',
  styleUrls: ['./updateplaylist.component.css']
})
export class UpdateplaylistComponent implements OnInit {
  playlistId;
  playlistDetails;
  showSuccessMessage:boolean;
  constructor(private playlistService:PlaylistService,private router:ActivatedRoute) { }

  ngOnInit() {
    let id = this.router.snapshot.paramMap.get('id');
    this.playlistId = id;
    console.log(this.playlistId);
    this.playlistService.getOnePlaylist(id).subscribe(
      res=>{
        this.playlistService.selectedPlaylist= res as Playlist;
        this.playlistDetails = this.playlistService.selectedPlaylist;
        console.log(res);
      },
      err=>{}
    );
  }

  onClose(){
    console.log(this.playlistService.selectedPlaylist);
  }

  onSubmit(form: NgForm) {
    this.playlistService.updatePlaylist(form.value).subscribe(
      res=>{
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage=false,4000);
       
        console.log('Updated successfully');
      }
      
    );
}

}
