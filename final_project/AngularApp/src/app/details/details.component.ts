import { Component, OnInit } from '@angular/core';
import { SongService } from '../shared/song.service';
import { Song } from '../shared/song.model';
import { ActivatedRoute } from '@angular/router';

import { SongComponent } from '../song/song.component';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public songId;
  songDetails;
  constructor(private songService : SongService,private router:ActivatedRoute){ }

  ngOnInit() {
    let id = this.router.snapshot.paramMap.get('id');
    this.songId = id;
    this.songService.getOneSong(id).subscribe(
      res=>{
        this.songService.selectedSong = res as Song;
        this.songDetails = this.songService.selectedSong;
        console.log(res);
      },
      err=>{}
    );
  }
}
