import { Component, OnInit } from '@angular/core';
import { SongService } from '../shared/song.service';
import { Song } from '../shared/song.model';
import { Observable } from 'rxjs';
import { MatSort,MatSortable,MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css'],
  providers:[SongService]
})
export class SongComponent implements OnInit {
 
  constructor(private songService:SongService) { }
  
  listData:MatTableDataSource<any>;
  displayedColumns:string[]=['title','artist','album','score','option']
  ngOnInit() {
    this.refreshSongList();
  }

  refreshSongList(){
    /*var dummyData = [{title:"jump",artist:"jason",album:"route","score":7.5},
    {title:"see you again",artist:"justin",album:"speed and passion","score":8.5},]

    this.listData = new MatTableDataSource(dummyData);*/
    this.songService.getSongList().subscribe(data=>{
      this.listData = new MatTableDataSource(data);
    });
  }
}
