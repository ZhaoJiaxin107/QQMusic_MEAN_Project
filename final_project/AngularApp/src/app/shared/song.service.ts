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
    num:2,
    score:null
  };
  songs:Song[];

  readonly APIUrl ="http://localhost:3000/api/song";
  constructor(private http:HttpClient) { }

  getSongList():Observable<Song[]>{
    return this.http.get<Song[]>(this.APIUrl+'/open/readSong');
  }

  getTrueSongList():Observable<Song[]>{
    return this.http.get<Song[]>(this.APIUrl+'/open/readTruesong');
  }

  getOneSong(_id){
    return this.http.get(this.APIUrl + '/open/readSong'+`/${_id}`);
  }

  postSong(song: Song) {
    return this.http.post(this.APIUrl+'/secure/createSong', song);
  }

  adminShowSong(_id,value){
    return this.http.put(this.APIUrl + '/secure/showSong' +`/${_id}`,value);
  }

  adminHideSong(_id,value){
    return this.http.put(this.APIUrl + '/secure/hideSong' +`/${_id}`,value);
  }

}

