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
    FooterComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
