import { PostFormComponent } from './components/post/post-form/post-form.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyListPostsComponent } from './components/admin/my-list-posts/my-list-posts.component'
import { ListPostComponent } from "./components/post/list-post/list-post.component";
import { SigninComponent } from "./components/auth/signin/signin.component";
import { SignupComponent } from "./components/auth/signup/signup.component";
import { ProfileComponent } from "./components/auth/profile/profile.component";
import { LostPasswordComponent } from "./components/auth/lost-password/lost-password.component";
import {  SinglePostComponent} from './components/post/single-post/single-post.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: "", component: ListPostComponent },
  { path: "auth/signin", component: SigninComponent },
  { path: "auth/signup", component: SignupComponent },
  { path: "auth/profile", canActivate:[AuthGuardService], component: ProfileComponent }, // TO DO : only user auth
  { path: "auth/lost-password", component: LostPasswordComponent },
  { path: "posts", component: ListPostComponent },
  { path: 'posts/new',canActivate:[AuthGuardService], component: PostFormComponent }, // TO DO : only user auth
  { path: 'posts/view/:id', component: SinglePostComponent},
  { path: 'admin/posts', canActivate:[AuthGuardService], component: MyListPostsComponent}, // TO DO : only user auth
  { path: '', redirectTo: 'posts', pathMatch: 'full'},
  { path: '**', redirectTo: 'posts' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
