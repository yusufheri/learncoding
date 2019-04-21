import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-list-posts',
  templateUrl: './my-list-posts.component.html',
  styleUrls: ['./my-list-posts.component.scss']
})
export class MyListPostsComponent implements OnInit {
  posts: Post[];
  constructor(private router : Router, private postService : PostsService, private auth : AuthService) { 
     this.postService.getPosts("");
     const user = this.auth.getCurrentUser();
     this.posts = this.postService.posts.filter(post => post.idUser==user.id);
  }

  ngOnInit() {
   
  }

  onNewPost() {
    this.router.navigate(['/posts', 'new']);
  }

  onDelete(post: Post) {
    if(confirm("Do you delete this post ?")) {
      this.postService.removePost(post);
      this.router.navigate(['/posts']);
    }else {
      alert("Cancel");
    }
    
  }

}
