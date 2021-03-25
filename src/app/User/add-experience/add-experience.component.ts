import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user/userservice/user.service';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})
export class AddExperienceComponent implements OnInit {

  @ViewChild('editexperience', {static: false})
  newForm!: NgForm;

  userid:any;
  UserDetails:any=[];

  title!: string;
  company!: string;
  location!: string;
  start!:string;
  end!: string;
  job!: string;

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

    this.userservice.getSelectedUserExperience(this.userid).subscribe((res)=>{
    //  console.log(res);
      this.UserDetails=res;
        this.title=this.UserDetails.data.title;
        this.company=this.UserDetails.data.company;
        this.location=this.UserDetails.data.location;
        this.start=this.UserDetails.data.start;
        this.end=this.UserDetails.data.end;
        this.job=this.UserDetails.data.job;

        setTimeout(()=>{
          this.newForm.form.patchValue({
            title:this.title,
            company: this.company,
            location: this.location,
            start: this.start,
            end:this.end,
            job:this.job
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
