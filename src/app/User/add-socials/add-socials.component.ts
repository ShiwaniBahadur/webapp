import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user/userservice/user.service';

@Component({
  selector: 'app-add-socials',
  templateUrl: './add-socials.component.html',
  styleUrls: ['./add-socials.component.css']
})
export class AddSocialsComponent implements OnInit {

  @ViewChild('editsocials', {static: false})
  newForm!: NgForm;

  userid:any;
  UserDetails:any=[];

  website!: string;
  linkedin!: string;
  github!: string;
  twitter!: string;
  insta!: string;
  facebook!: string;

  constructor(
    private activatedroute: ActivatedRoute,
    public userservice: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {

    if(!this.userservice.isLoggedIn())
    {
      this.router.navigateByUrl('/');
    }
    this.activatedroute.queryParams.subscribe(params=>{
      this.userid=params['id'];
    })

    this.userservice.getSelectedUserSocials(this.userid).subscribe((res)=>{
    //  console.log(res);
      this.UserDetails=res;
        this.website=this.UserDetails.data.website;
        this.linkedin=this.UserDetails.data.linkedin;
        this.github=this.UserDetails.data.github;
        this.twitter=this.UserDetails.data.twitter;
        this.insta=this.UserDetails.data.insta;
        this.facebook=this.UserDetails.data.facebook;

        setTimeout(()=>{
          this.newForm.form.patchValue({
            title:this.website,
            linkedin: this.linkedin,
            github: this.github,
            twitter: this.twitter,
            insta:this.insta,
            facebook:this.facebook
          })
        }, )
    })

  }


  onSubmit(F: NgForm){
    if(!F.invalid){
      this.userid=this.activatedroute.queryParams.subscribe(params=>{
        this.userid=params['id'];
        this.userservice.updateUserBio(this.userid, F.value).subscribe((res)=>{
          console.log(res);
        })
        this.router.navigate(['/profile'], {"queryParams": {id:this.userid}});
      })
    }
  }

  onClick(){
    this.router.navigate(['/profile'], {"queryParams": {id:this.userid}});
  }

}
