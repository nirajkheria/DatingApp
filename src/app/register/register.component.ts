import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() registerCancelled = new EventEmitter();
  @Input() valuesFromHome: any;

  constructor() {}

  ngOnInit(): void {}

  register() {
    console.log(this.model);
  }

  cancel() {
    this.registerCancelled.emit(false);
  }
}
