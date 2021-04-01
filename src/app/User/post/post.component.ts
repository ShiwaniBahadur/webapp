import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user/userservice/user.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  userid: any;
  UserPosts:any=[];
  UserDetails:any=[];

  posts: string='';
  date: string='';
  user: string='';
  id: string='';
  name: string='';

  constructor(
    public userservice: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  ngOnInit(): void {

    if(!this.userservice.isLoggedIn())
    {
      this.router.navigateByUrl('/');
    }

    this.userid=this.activatedRoute.queryParams.subscribe(params=>{
      this.userid=params['id'];
      //console.log(this.userid);
      this.userservice.getSelectedUser(this.userid).subscribe((res)=>{
        this.UserDetails=res;
        this.id=this.UserDetails.data._id;
        this.name=this.UserDetails.data.name;
        //console.log(this.id);
      })




    })

    this.userservice.displayPost().subscribe((res)=>{
      // console.log(res);
     // console.log(this.id);
      this.UserPosts=res;
      // console.log(this.UserPosts);
      this.user = this.UserPosts.data.user;
      this.posts = this.UserPosts.data.posts;
      this.date = this.UserPosts.data.date;
    })



  }

  onSubmit(F: NgForm){
    if(!F.invalid){
      this.userid=this.activatedRoute.queryParams.subscribe(params=>{
        this.userid=params['id'];
        // console.log(this.userid);
       // console.log(F.value);
    this.userservice.postCreate(this.userid, F.value).subscribe((res)=>{
      // console.log(res);
    })
  },(err)=>{
      console.log(err);
    })
    // @ts-ignore
    this._document.defaultView.location.reload();
  }
}


}




