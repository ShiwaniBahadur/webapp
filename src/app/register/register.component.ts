import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user/userservice/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // public show:boolean = false;
  // public buttonName:any = 'Show';


  constructor(
    public userservice: UserService,
    private router: Router
  ) { }



  ngOnInit(): void {
  }

  // toggle() {
  //   this.show = !this.show;
  //   if(this.show)
  //     this.buttonName = "Hide";
  //   else
  //     this.buttonName = "Show";
  // }

  onSubmit(F: NgForm){
    if(!F.invalid){
    this.userservice.addnewUser(F.value).subscribe((res)=>{
      // console.log(res);
      this.router.navigateByUrl('/login')
    },(err)=>{
      console.log(err);
    })
  }
}

}
