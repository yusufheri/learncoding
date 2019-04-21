import { Component, OnDestroy, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/user.model";
import * as Cookies from 'es-cookie';
import { PostsService } from './../../services/posts.service';
import { Subscription } from 'rxjs';


@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, OnDestroy {
  
  app_name: string = 'LearnCoding';
  posts_count: number = 0;
  posts_countSubscription: Subscription;
  current_userSubscription: Subscription;
  
  isAuth: boolean;
  user: User;

 

  constructor(private authService: AuthService, private postService: PostsService) {}

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuth = true;
        this.user = this.authService.getCurrentUser(); 
      } else {
        this.isAuth = false;
      }
    });

    this.posts_countSubscription = this.postService.count_postSubject.subscribe(
      (posts_count: number) => {
        this.posts_count = posts_count;
      }
    );
    this.postService.emitCountPostUser();

    this.current_userSubscription = this.authService.current_userSubject.subscribe(
      (user: User) => {
        this.user = user;
      }
    );
    this.authService.emitCurrentUser();

  }

  ngOnDestroy(): void {
      this.posts_countSubscription.unsubscribe();
      this.current_userSubscription.unsubscribe();
    }

  onSignOut() {
    this.authService.signOutUser();
  }

  getPostCount(): number {
    return this.postService.count_post_user? this.postService.count_post_user : 0;
  }
}
