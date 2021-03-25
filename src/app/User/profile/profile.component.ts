import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user/userservice/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userservice: UserService
  ) { }

  userid:any;
  UserDetails:any=[];
  name: String="";
  profile: String="";
  email: String="";
  address: String="";

  school!: string;
  degree!: string;
  from!: string;
  to!: string;
  about!: string;
  skills!: string;

  title!: string;
  company!: string;
  location!: string;
  start!:string;
  end!: string;
  job!: string;

  website!: string;
  linkedin!: string;
  github!: string;
  twitter!: string;
  insta!: string;
  facebook!: string;


  ngOnInit(){
    if(!this.userservice.isLoggedIn())
    {
      this.router.navigateByUrl('/');
    }
    this.userid=this.activatedRoute.queryParams.subscribe(params=>{
      this.userid=params['id'];
      //console.log(this.userid);
      this.userservice.getSelectedUser(this.userid).subscribe((res)=>{
        this.UserDetails=res;
        this.name=this.UserDetails.data.name;
        this.profile=this.UserDetails.data.profile;
        this.email=this.UserDetails.data.email;
        this.address=this.UserDetails.data.address;

        this.school=this.UserDetails.data.school;
        this.degree=this.UserDetails.data.degree;
        this.from=this.UserDetails.data.from;
        this.to=this.UserDetails.data.to;
        this.about=this.UserDetails.data.about;
        this.skills=this.UserDetails.data.skills;

        this.title=this.UserDetails.data.title;
        this.company=this.UserDetails.data.company;
        this.location=this.UserDetails.data.location;
        this.start=this.UserDetails.data.start;
        this.end=this.UserDetails.data.end;
        this.job=this.UserDetails.data.job;

        this.website=this.UserDetails.data.website;
        this.linkedin=this.UserDetails.data.linkedin;
        this.github=this.UserDetails.data.github;
        this.twitter=this.UserDetails.data.twitter;
        this.insta=this.UserDetails.data.insta;
        this.facebook=this.UserDetails.data.facebook;
        console.log(this.UserDetails.data.name);

        // console.log(res);
      });
    },(err)=>{
      console.log(err);
    })
  }

  edit(){
    this.userid=this.activatedRoute.queryParams.subscribe(params=>{
    this.userid=params['id'];
    this.router.navigate(['/edit-bio'], {"queryParams": {id:this.userid}});
    })
  }

  editEducation(){
    this.userid=this.activatedRoute.queryParams.subscribe(params=>{
      this.userid=params['id'];
      this.router.navigate(['/add-education'], {"queryParams": {id:this.userid}});
      })
  }

  editExperience(){
    this.userid=this.activatedRoute.queryParams.subscribe(params=>{
      this.userid=params['id'];
      this.router.navigate(['/add-experience'], {"queryParams": {id:this.userid}});
      })
  }

  onEditSocials(){
    this.userid=this.activatedRoute.queryParams.subscribe(params=>{
      this.userid=params['id'];
      this.router.navigate(['/add-socials'], {"queryParams": {id:this.userid}});
      })
  }

}
