import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser:User = {
    fullname:'',
    email:'',
    password:''
  };
  noAuthHeader = {headers:new HttpHeaders({'NoAuth':'True'})};

  constructor(private http:HttpClient) {}
  //Http Methods
  postUser(user:User){
    return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  }

  login(authCredentials){
    return this.http.post(environment.apiBaseUrl + '/authenticate',authCredentials,this.noAuthHeader);
  }

  getUserProfile(){
    return this.http.get(environment.apiBaseUrl+'/userProfile');
  }

  getallUsers(){
    return this.http.get(environment.apiBaseUrl+'/users');
  }

  grantAdmin(_id,value){
    return this.http.put(environment.apiBaseUrl + '/users' +`/${_id}`,value);
  }

  setActiveAdmin(_id,value){
    return this.http.put(environment.apiBaseUrl + '/adminset' +`/${_id}`,value);
  }

  setDeActiveAdmin(_id,value){
    return this.http.put(environment.apiBaseUrl + '/adminsetdeactive' +`/${_id}`,value);
  }


  //Helper Methods
  setToken(token:string){
    localStorage.setItem('token',token);
  }
  getToken(){
    return localStorage.getItem('token');
  }

  deleteToken(){
    localStorage.removeItem('token');
  }

  getUserPayload(){
    var token = this.getToken();
    if(token){
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }else{
      return null;
    }
  }

  isLoggedIn(){
    var userPayload = this.getUserPayload();
    if(userPayload)
      return userPayload.exp > Date.now()/1000;
    else
      return false;
  }


}
