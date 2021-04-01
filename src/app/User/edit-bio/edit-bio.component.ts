import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user/userservice/user.service';
import {User} from 'src/app/shared/user/usermodel/user.model';
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

        setTimeout(()=>{
          this.newForm.form.patchValue({
            name:this.name,
            email: this.email,
            profile: this.profile,
            address: this.address,
          })
        }, )
    })


  }

  onSubmit(F: NgForm){
    if(!F.invalid){
      this.userid=this.activatedRoute.queryParams.subscribe(params=>{
        this.userid=params['id'];
        this.userservice.updateUserBio(this.userid, F.value).subscribe((res)=>{
          // console.log(res);
        })
        this.router.navigate(['/profile'], {"queryParams": {id:this.userid}});
      })
    }

  }

  onDelete(id: string){
     // console.log(this.userid);
     // console.log(id);
      this.userservice.deleteUser(id).subscribe((res)=>{
        alert("Account deleted Successfully");
        this.router.navigateByUrl('/');
      },error=>{
        console.log(error);
      });

      this.userservice.removeToken();
      this.ngOnInit();
  }

  onClick(){
    // console.log(this.userid);
    this.router.navigate(['/profile'], {"queryParams": {id:this.userid}});
  }

}
