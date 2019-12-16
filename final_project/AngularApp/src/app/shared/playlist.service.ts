import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Playlist } from './playlist.model';
@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  selectedPlaylist:Playlist={
    _id:"",
    status:true,
    playlisttitle:"Star",
    description:"Become Stars",
    fullname:"JiaxinZhao",
    title:"",
    artist:""
  };
  playlists:Playlist[];
  readonly baseURL = 'http://localhost:3000/api/playlist';
  constructor(private http:HttpClient) { }

  postPlaylist(play: Playlist) {
    return this.http.post(this.baseURL + '/secure/createPlaylist', play);
  }

  getPlaylist() {
    return this.http.get(this.baseURL + '/secure/readPlaylist');
  }

  getOnePlaylist(_id:string){
    return this.http.get(this.baseURL + '/secure/readPlaylist'+`/${_id}`);
  }


  updatePlaylist(play: Playlist) {
    return this.http.put(this.baseURL + '/secure/updatePlaylist'+ `/${play._id}`, play);
  }

  deletePlaylist(_id: string) {
    return this.http.delete(this.baseURL + '/secure/deletePlaylist' + `/${_id}`);
  }


}
