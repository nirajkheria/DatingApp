import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { AuthService } from "../_services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() registerCancelled = new EventEmitter();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  register() {
    this.authService.register(this.model).subscribe(
      () => {
        console.log("Registration Successful");
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancel() {
    this.registerCancelled.emit(false);
  }
}
