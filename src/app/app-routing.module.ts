import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListPostComponent } from "./components/post/list-post/list-post.component";
import { SigninComponent } from "./components/auth/signin/signin.component";
import { SignupComponent } from "./components/auth/signup/signup.component";
import { ProfileComponent } from "./components/auth/profile/profile.component";
import { LostPasswordComponent } from "./components/auth/lost-password/lost-password.component";

const routes: Routes = [
  { path: "", component: ListPostComponent },
  { path: "auth/signin", component: SigninComponent },
  { path: "auth/signup", component: SignupComponent },
  { path: "auth/profile", component: ProfileComponent }, // TO DO : only user auth
  { path: "auth/lost-password", component: LostPasswordComponent },
  { path: "posts", component: ListPostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
