import { Component } from "@angular/core";
import * as firebase from "firebase";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor() {
    var config = {
      apiKey: "AIzaSyBVedouziGufaGjnE9nj5F5C6xO-ZMfsns",
      authDomain: "learncoding-fa791.firebaseapp.com",
      databaseURL: "https://learncoding-fa791.firebaseio.com",
      projectId: "learncoding-fa791",
      storageBucket: "learncoding-fa791.appspot.com",
      messagingSenderId: "342519972542"
    };
    firebase.initializeApp(config);
  }
}
