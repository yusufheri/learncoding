import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/user.model";
import * as Cookies from 'es-cookie';


@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  app_name: string = 'LearnCoding';
  isAuth: boolean;
  user: User;
 

  constructor(private authService: AuthService) {}

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuth = true;
        this.user = this.authService.getCurrentUser();
        // console.log(this.user);
      } else {
        this.isAuth = false;
      }
    });
  }

  onSignOut() {
    this.authService.signOutUser();
  }
}
