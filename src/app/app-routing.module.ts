import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './User/profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { EditBioComponent } from './User/edit-bio/edit-bio.component';
import { AddEducationComponent } from './User/add-education/add-education.component';
import { AddExperienceComponent } from './User/add-experience/add-experience.component';
import { AddSocialsComponent } from './User/add-socials/add-socials.component';
import { PostComponent } from './User/post/post.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-education',
    component: AddEducationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-experience',
    component: AddExperienceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-socials',
    component: AddSocialsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'edit-bio',
    component: EditBioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'post',
    component: PostComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
