import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"]
})
export class SigninComponent implements OnInit {
  isError: boolean;
  signinForm: FormGroup;
  errorMessage: string;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signinForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]
      ]
    });
  }

  onSubmit() {
    const email = this.signinForm.value["email"];
    const password = this.signinForm.value["password"];

    this.authService.signInUser(email, password).then(
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
