import { Component, OnInit } from '@angular/core';
import { SongService } from '../shared/song.service';
import { Song } from '../shared/song.model'
@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css'],
  providers:[SongService]
})
export class SongComponent implements OnInit {

  constructor(private songService:SongService) { }

  ngOnInit() {
    this.refreshSongList();
  }

  refreshSongList(){
    this.songService.getSongList().subscribe((res) =>{
      this.songService.songs = res as Song[];
    });
  }
}
