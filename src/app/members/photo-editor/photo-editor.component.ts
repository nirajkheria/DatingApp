import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Photo } from "src/app/_models/photo";
import { FileUploader } from "ng2-file-upload";
import { environment } from "src/environments/environment";
import { AuthService } from "src/app/_services/auth.service";
import { UserService } from "src/app/_services/user.service";
import { AlertifyService } from "src/app/_services/alertify.service";

const URL = "https://evening-anchorage-3159.herokuapp.com/api/";

@Component({
  selector: "app-photo-editor",
  templateUrl: "./photo-editor.component.html",
  styleUrls: ["./photo-editor.component.css"],
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() mainPhotoChanged = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMainPhoto: Photo;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {
    this.initializeUploader();
  }

  ngOnInit() {}

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url:
        this.baseUrl +
        "users/" +
        this.authService.decodedToken.nameid +
        "/photos",
      authToken: "Bearer " + localStorage.getItem("token"),
      isHTML5: true,
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain,
        };

        this.photos.push(photo);
      }
    };
  }

  setMainPhoto(photo: Photo) {
    this.userService
      .setMainPhoto(this.authService.decodedToken.nameid, photo.id)
      .subscribe(
        () => {
          // this.alertify.success("Success");
          this.currentMainPhoto = this.photos.filter((p) => p.isMain)[0];
          this.currentMainPhoto.isMain = false;
          photo.isMain = true;
          this.mainPhotoChanged.emit(photo.url);
          // this.photos.find((p) => p.isMain).isMain = false;
          // this.photos.find((p) => p.id == photo.id).isMain = true;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
}
