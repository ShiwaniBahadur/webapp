import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user/userservice/user.service';
import {User} from 'src/app/shared/user/usermodel/user.model'

@Component({
  selector: 'app-edit-bio',
  templateUrl: './edit-bio.component.html',
  styleUrls: ['./edit-bio.component.css']
})
export class EditBioComponent implements OnInit {


  constructor(
    public userservice: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  @ViewChild('update', {static: false})
  newForm!: NgForm;

  userid:any;
  UserDetails:any=[];
  name: String="";
  profile: String="";
  email: String="";
  address: String="";

  // school: String="";
  // degree: String="";
  // from: String="";
  // to: String="";
  // about: String="";
  // skills: String="";

  editUser!:User;

  ngOnInit(): void {
    if(!this.userservice.isLoggedIn())
    {
      this.router.navigateByUrl('/');
    }
    this.activatedRoute.queryParams.subscribe(params=>{
      this.userid=params['id'];
    })

    this.userservice.getSelectedUserInfo(this.userid).subscribe((res)=>{
      this.UserDetails=res;
        this.name=this.UserDetails.data.name;
        this.profile=this.UserDetails.data.profile;
        this.email=this.UserDetails.data.email;
        this.address=this.UserDetails.data.address;
        // this.school=this.UserDetails.data.school;
        // this.degree=this.UserDetails.data.degree;
        // this.from=this.UserDetails.data.from;
        // this.to=this.UserDetails.data.to;
        // this.about=this.UserDetails.data.about;
        // this.skills=this.UserDetails.data.skills;

        setTimeout(()=>{
          this.newForm.form.patchValue({
            name:this.name,
            email: this.email,
            profile: this.profile,
            address: this.address,
            // school:this.school,
            // degree: this.degree,
            // from: this.from,
            // to: this.to,
            // about:this.about,
            // skills:this.skills
          })
        }, )
    })


  }

  onSubmit(F: NgForm){
    if(!F.invalid){
      this.userid=this.activatedRoute.queryParams.subscribe(params=>{
        this.userid=params['id'];
        this.userservice.updateUserBio(this.userid, F.value).subscribe((res)=>{
          console.log(res);
        })
        this.router.navigate(['/profile'], {"queryParams": {id:this.userid}});
      })
    }

  }

  onDelete(){
      console.log(this.userid);
      this.userservice.deleteUser(this.userid);
      this.router.navigateByUrl('/');
      alert("Account deleted Successfully");
      this.userservice.removeToken();
  }

  onClick(){
    console.log(this.userid);
    this.router.navigate(['/profile'], {"queryParams": {id:this.userid}});
  }

}
