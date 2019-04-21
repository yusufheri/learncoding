import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  post: Post;
  constructor(private route: ActivatedRoute, private postService: PostsService, private router: Router) { }

  ngOnInit() {
    this.post = new Post("","","",new User("","",""));
    const id = this.route.snapshot.params["id"];
    this.postService.getSinglePost(+id).then(
      (post: Post) => {
        this.post = post;
      }
    );
  }

  onBack() {
    this.router.navigate(["/posts"]);
  }

  onLiked() {
    this.post.likes ++;
  }

  onDisliked() {
    this.post.dislikes ++;
  }

}
