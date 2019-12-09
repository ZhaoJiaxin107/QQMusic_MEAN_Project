import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Song } from './song.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SongService {
  readonly APIUrl ="http://localhost:3000/api";
  constructor(private http:HttpClient) { }

  getSongList():Observable<Song[]>{
    return this.http.get<Song[]>(this.APIUrl+'/song');
  }
}

