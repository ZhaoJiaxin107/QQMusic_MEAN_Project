import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Song } from './song.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SongService {
  selectedSong:Song = {
    header:"",
    _id:"",
    title:"",
    artist:"",
    album:"",
    year:0,
    comment:"",
    reserve:"",
    track:0,
    review:"",
    num:0,
    score:0
  };
  songs:Song[];

  readonly APIUrl ="http://localhost:3000/api";
  constructor(private http:HttpClient) { }

  getSongList():Observable<Song[]>{
    return this.http.get<Song[]>(this.APIUrl+'/song');
  }

  getOneSong(_id){
    return this.http.get(this.APIUrl + '/song'+`/${_id}`);
  }
}

