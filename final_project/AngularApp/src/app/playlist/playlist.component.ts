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
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
  providers:[SongService,PlaylistService]
})
export class PlaylistComponent implements OnInit {
  songTitle;
  songArtist;
  constructor(private songService:SongService,
    private playlistService:PlaylistService,
    private router:Router) { }
  
  listData:MatTableDataSource<any>;
  displayedColumns:string[]=['title','artist','album','score','option']

  @ViewChild(MatSort,null) sort:MatSort;

  ngOnInit() {
    this.refreshSongList();
  }

  refreshSongList(){
    this.songService.getSongList().subscribe(data=>{
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
