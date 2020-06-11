import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() registerCancelled = new EventEmitter();

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {}

  register() {
    this.authService.register(this.model).subscribe(
      () => {
        this.alertifyService.success("Registration Successful");
      },
      (error) => {
        this.alertifyService.error(error);
      }
    );
  }

  cancel() {
    this.registerCancelled.emit(false);
  }
}
