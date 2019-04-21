import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PostsService } from '../../../services/posts.service';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Post } from './../../../models/post.model';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;
  errorMessage: string;
  isError: boolean;

  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(
    private postService: PostsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      title: ['', [ Validators.required, Validators.minLength(10)] ],
      category: ["Angular 7 & Firebase", Validators.required],
      description: ['', Validators.required]
    });
  }

  onSavePost() {
    const title = this.postForm.value['title'];
    const category = this.postForm.value['category'];
    const description = this.postForm.value['description'];
    const user = this.authService.getCurrentUser();

    const post: Post = new Post(title, description, category, user);
      
    if (this.fileUrl && this.fileUrl !== "") {
      post.photo = this.fileUrl;
    }
    this.postService.createNewPost(post);
    this.router.navigate(["/posts"]);

  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.postService.uploadFile(file).then((url: string) => {
      this.fileUrl = url;
      this.fileIsUploading = false;
      this.fileUploaded = true;
    });
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

}
