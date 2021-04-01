import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { createPost, loginUser, User } from '../usermodel/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  newUser: User = {
    name: '',
    email: '',
    profile: '',
    address: '',
    password: '',
    repass: '',
    school: '',
    degree: '',
    from: '',
    to: '',
    about: '',
    skills: '',
    title: '',
    company: '',
    location: '',
    start: '',
    end: '',
    job: '',
    website: '',
    linkedin: '',
    github: '',
    twitter: '',
    insta: '',
    facebook: '',
  }

  existingUser: loginUser = {
    email: '',
    password: ''
  }

  newPost: createPost = {
    posts: ''
  }

  constructor(
    private http: HttpClient
  ) { }

  addnewUser(newuser: User){
    return this.http.post(environment.apiBaseUrl + 'webapp/newUser', newuser);
  }

  login(loginuser: loginUser){
    return this.http.post(environment.apiBaseUrl + 'webapp/auth', loginuser);
  }

  postCreate(id: string, newposts: createPost ){
    return this.http.post(environment.apiBaseUrl + 'webapp/createPost/' + id , newposts);
  }

  displayPost(){
    return this.http.get(environment.apiBaseUrl+'webapp/getPost');
  }

  getSelectedUser(id: string){
    return this.http.get(environment.apiBaseUrl+'webapp/user/'+ id);
  }

  getSelectedUserInfo(id: string){
    return this.http.get(environment.apiBaseUrl+'webapp/userInfo/'+ id);
  }

  getSelectedUserEducation(id: string){
    return this.http.get(environment.apiBaseUrl+'webapp/userEducation/'+ id);
  }

  getSelectedUserExperience(id: string){
    return this.http.get(environment.apiBaseUrl+'webapp/userExperience/'+ id);
  }

  getSelectedUserSocials(id: string){
    return this.http.get(environment.apiBaseUrl+'webapp/userSocials/'+ id);
  }

  updateUserBio(id: string, newuser: User){
    return this.http.put(environment.apiBaseUrl + 'webapp/updateInfo/' + id, newuser);
  }

  deleteUser(id: string){
    return this.http.delete(environment.apiBaseUrl + 'webapp/deleteUser/' + id);
  }

  // functions for token
  setToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  removeToken(){
    localStorage.removeItem('token');
  }

  isAuthenticated(){
    return localStorage.getItem('token')!=null;
  }

  // To get payload part
  getPayload(){
    var token = JSON.stringify(this.getToken());  // get token from local storage
    var userPayload = atob(token?.split('.')[1]);
    if(userPayload){
      return JSON.parse(userPayload);
    }
    else{
      return null;
    }
  }

  // to check whether the token is expired or not
  isLoggedIn(){
    var userPayload = this.getPayload();
    if(userPayload){
      return userPayload.exp>Date.now()/1000;
    }
    else return null;
  }
}
