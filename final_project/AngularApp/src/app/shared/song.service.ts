import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Song } from './song.model';
@Injectable({
  providedIn: 'root'
})
export class SongService {
  selectedSong:Song;
  songs:Song[];
  constructor(private http:HttpClient) { }

  getSongList(){
    return this.http.get(environment.apiBaseUrl+'/song');
  }
}

