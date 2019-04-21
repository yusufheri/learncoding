import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
user:User;
count_post: number;
  constructor(private authService: AuthService, private postService: PostsService) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    const postUser = this.postService.posts.filter(element => element.user.email = this.user.email);
    this.count_post = postUser.length;
    console.log(this.count_post);
  }

}
