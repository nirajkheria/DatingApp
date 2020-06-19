import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() registerCancelled = new EventEmitter();
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        username: new FormControl("", Validators.required),
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(8),
        ]),
        confirmPassword: new FormControl("", Validators.required),
      },
      this.passwordMatchValidator
    );
  }

  register() {
    // this.authService.register(this.model).subscribe(
    //   () => {
    //     this.alertifyService.success("Registration Successful");
    //   },
    //   (error) => {
    //     this.alertifyService.error(error);
    //   }
    // );

    console.log(this.registerForm.value);
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get("password").value === g.get("confirmPassword").value
      ? null
      : { mismatch: true };
  }

  cancel() {
    this.registerCancelled.emit(false);
  }
}
