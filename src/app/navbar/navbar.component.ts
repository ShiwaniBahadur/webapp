import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user/userservice/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public userservice: UserService
  ) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.userservice.removeToken();
  }

}
