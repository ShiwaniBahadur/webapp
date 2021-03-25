import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user/userservice/user.service';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css']
})
export class AddEducationComponent implements OnInit {

  editeducation!:FormGroup;
  submitted = false;

  @ViewChild('editeducation', {static: false})
  newForm!: NgForm;

  userid:any;
  UserDetails:any=[];

  school: String="";
  degree: String="";
  from: String="";
  to: String="";
  about: String="";
  skills: String="";

  constructor(
    private activatedroute: ActivatedRoute,
    public userservice: UserService,
    private router: Router,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    if(!this.userservice.isLoggedIn())
    {
      this.router.navigateByUrl('/');
    }
    this.activatedroute.queryParams.subscribe(params=>{
      this.userid=params['id'];
    })

    this.editeducation = new FormGroup({
      school: new FormControl(),
      degree: new FormControl(),
      from: new FormControl(),
      to: new FormControl(),
      about: new FormControl(),
      skills: new FormControl()
    })

    this.editeducation=this.formBuilder.group({
      school: ['', Validators.required],
      degree: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      about: [''],
      skills:['']
    })

    this.userservice.getSelectedUserEducation(this.userid).subscribe((res)=>{
   // console.log(res);
      this.UserDetails=res;
        this.school=this.UserDetails.data.school;
        this.degree=this.UserDetails.data.degree;
        this.from=this.UserDetails.data.from;
        this.to=this.UserDetails.data.to;
        this.about=this.UserDetails.data.about;
        this.skills=this.UserDetails.data.skills;

        setTimeout(()=>{
          this.editeducation.patchValue({
            school:this.school,
            degree: this.degree,
            from: this.from,
            to: this.to,
            about:this.about,
            skills:this.skills
          })
        }, )
    })

  }

  get f(){
    return this.editeducation.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(!this.editeducation.invalid){
      this.userid=this.activatedroute.queryParams.subscribe(params=>{
        this.userid=params['id'];
        this.userservice.updateUserBio(this.userid, this.editeducation.value).subscribe((res)=>{
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


