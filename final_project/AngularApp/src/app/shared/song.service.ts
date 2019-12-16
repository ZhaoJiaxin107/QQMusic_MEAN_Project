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
    status:true,
    header:"TAG",
    _id:"",
    title:"",
    artist:"",
    album:"",
    year:null,
    comment:"",
    reserve:"",
    track:null,
    genre:"",
    review:"",
    num:null,
    score:null
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

  postSong(s: Song) {
    return this.http.post(this.APIUrl+'/song', s);
  }
}

