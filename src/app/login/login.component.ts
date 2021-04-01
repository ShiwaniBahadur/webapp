
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user/userservice/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showMessage = false;
  errorMessage = false;

  error: string = "";
  resData: any =[];
  id: string = '';

  constructor(
    public userservice: UserService,
    private router: Router
  ) { }

  ngOnInit(){
  }


  login(f: NgForm){
    // console.log(f.value);
    this.userservice.login(f.value).subscribe((res)=>{
      // console.log(res);
      this.resData = res;
      this.userservice.setToken(this.resData.token);
      this.id=this.resData.data._id;
      //console.log(this.id);
      //console.log(this.resData.token);
      this.router.navigate(['/profile'], {"queryParams": {id:this.id}});
      this.showMessage = true;
    }, (err)=>{
      this.errorMessage=true;
      this.error = JSON.stringify(err);
      console.log(err);
    })
  }



}
