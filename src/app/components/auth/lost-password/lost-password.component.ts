import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-lost-password",
  templateUrl: "./lost-password.component.html",
  styleUrls: ["./lost-password.component.scss"]
})
export class LostPasswordComponent implements OnInit {
  isError: boolean;
  lostPasswordForm: FormGroup;
  errorMessage: string;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.lostPasswordForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    const email = this.lostPasswordForm.value["email"];
    this.authService.lostPassword(email).then(
      () => {
        this.isError = false;
        this.router.navigate(["/auth/signin"]);
      },
      error => {
        this.isError = true;
        this.errorMessage = error;
      }
    );
  }
}
