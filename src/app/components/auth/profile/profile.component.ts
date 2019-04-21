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
    
    //this.count_post = postUser.length;
  }

}
