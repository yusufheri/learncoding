import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/user.model";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  app_name: string = "LearnCoding";
  isAuth: boolean;
  currentUser: User;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuth = true;     
        this.currentUser = this.authService.users.filter(elt => elt.email === user.email)[0];
        console.log(this.authService.users.length);
      } else {
        this.isAuth = false;
        this.currentUser = null;
      }
    });
  }

  onSignOut() {
    this.authService.signOutUser();
  }
}
