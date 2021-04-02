import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/user/userservice/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  userid:any;

  constructor(
    public userservice: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if(!this.userservice.isLoggedIn())
    {
      this.router.navigateByUrl('/');
    }
    this.activatedRoute.queryParams.subscribe(params=>{
      this.userid=params['id'];
    })
  }

  onPost(){
    this.userid=this.activatedRoute.queryParams.subscribe(params=>{
      this.userid=params['id'];
      this.router.navigate(['/post'], {"queryParams": {id:this.userid}});
      })
  }

  onProfile(){
    // console.log(this.userid);
    this.userid=this.activatedRoute.queryParams.subscribe(params=>{
      this.userid=params['id'];
      this.router.navigate(['/profile'], {"queryParams": {id:this.userid}});
      })
  }

  onLogout(){
    alert("Logged Out Successfully");
    this.userservice.removeToken();
    this.router.navigateByUrl('/');
  }

}
