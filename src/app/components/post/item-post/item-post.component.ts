import { Component, OnInit, Input } from '@angular/core';
import { Post } from './../../../models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-post',
  templateUrl: './item-post.component.html',
  styleUrls: ['./item-post.component.scss']
})
export class ItemPostComponent implements OnInit {

  @Input() post: Post;
  @Input() id: number;
  canLike: boolean;

  constructor(private postService: PostsService, private router : Router) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.canLike = true;
      }else {
        this.canLike = false;
      }
    });
  }

  onLiked() {
    if(this.canLike) {
       this.post.likes ++;
    } else {
      this.router.navigate(["/auth", "signin"]);
    }
   
  }

  onDisliked() {
    if(this.canLike) {
      this.post.dislikes ++;
    } else {
      this.router.navigate(["/auth", "signin"]);
    }    
  }

  getColor() : string{
    if (this.post.likes < this.post.dislikes) {
      return '#dc3545';
    } else {
      return '#495057';
    }
  }

  onViewPost(id : number) {
    this.router.navigate(['/posts', 'view', id]);
  }

}
