import { PostsService } from './services/posts.service';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SigninComponent } from "./components/auth/signin/signin.component";
import { SignupComponent } from "./components/auth/signup/signup.component";
import { ProfileComponent } from "./components/auth/profile/profile.component";
import { LostPasswordComponent } from "./components/auth/lost-password/lost-password.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ItemPostComponent } from "./components/post/item-post/item-post.component";
import { ListPostComponent } from "./components/post/list-post/list-post.component";
import { HeroComponent } from "./components/navbar/hero/hero.component";
import { FooterComponent } from "./components/footer/footer.component";
import { AuthService } from "./services/auth.service";
import { PostFormComponent } from './components/post/post-form/post-form.component';
import { SinglePostComponent } from './components/post/single-post/single-post.component';

import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { AuthGuardService } from './services/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    ProfileComponent,
    LostPasswordComponent,
    NavbarComponent,
    ItemPostComponent,
    ListPostComponent,
    HeroComponent,
    FooterComponent,
    PostFormComponent,
    SinglePostComponent,
    TruncateTextPipe
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],  
  providers: [AuthService, PostsService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
