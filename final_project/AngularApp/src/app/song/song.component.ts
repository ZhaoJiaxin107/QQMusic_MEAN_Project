import { Component, OnInit, ViewChild } from '@angular/core';
import { SongService } from '../shared/song.service';
import { Song } from '../shared/song.model';
import { Observable } from 'rxjs';
import { MatSort,MatSortable,MatTableDataSource} from '@angular/material';
import { filter } from 'rxjs/operators';
import { Router } from "@angular/router";

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css'],
  providers:[SongService]
})
export class SongComponent implements OnInit {
  constructor(private songService:SongService,private router:Router) { }
  
  listData:MatTableDataSource<any>;
  displayedColumns:string[]=['title','artist','album','score','option']

  @ViewChild(MatSort,null) sort:MatSort;

  ngOnInit() {
    this.refreshSongList();
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
  onSearch(song){
    this.router.navigate(['/details',song._id]);
  }
}
