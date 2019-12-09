import { Component, OnInit, ViewChild } from '@angular/core';
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
}
