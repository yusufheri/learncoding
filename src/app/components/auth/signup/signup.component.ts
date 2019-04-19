import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: string;
  isError: boolean;

  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]
      ],
      confirmpassword: [
        "",
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]
      ],
      skills: ""
    });
  }

  onSubmit() {
    const username = this.signupForm.value["name"];
    const email = this.signupForm.value["email"];
    const password = this.signupForm.value["password"];
    const confirmpassword = this.signupForm.value["confirmpassword"];
    const skills = this.signupForm.value["skills"];
    const user: User = new User(username, email, password);
    user.skills = skills;

    if (password != confirmpassword) {
      this.isError = true;
      this.errorMessage = "Both passwords are differents";
    } else {
      if (this.fileUrl && this.fileUrl !== "") {
        user.photo = this.fileUrl;
      }
      this.authService.createNewUser(user).then(
        () => {
          this.isError = false;
          this.router.navigate(["/posts"]);
        },
        error => {
          this.isError = true;
          this.errorMessage = error;
        }
      );
    }
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.authService.uploadFile(file).then((url: string) => {
      this.fileUrl = url;
      this.fileIsUploading = false;
      this.fileUploaded = true;
    });
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
}
