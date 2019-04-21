import { Router } from '@angular/router';
import { PostsService } from '../../../services/posts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from './../../../models/post.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit, OnDestroy {
 
  posts: Post[];
  postsSubcription: Subscription;

  user: User;
  constructor(private authService : AuthService, private postService:  PostsService, private router : Router) { }

  ngOnInit() {
    this.postsSubcription = this.postService.postsSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postService.emitPosts();
    this.user = this.authService.getCurrentUser();
  }

  ngOnDestroy(): void {
    this.postsSubcription.unsubscribe();
  }

}
