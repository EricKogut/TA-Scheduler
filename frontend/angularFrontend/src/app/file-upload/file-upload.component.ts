import { Component } from '@angular/core';
import { Subscription, pipe } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { environment } from '../environment';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  baseUrl = environment.backend_url;

  fileName = '';
  uploadProgress: number;
  uploadSub: Subscription;

  constructor(private http: HttpClient) { }

  toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    })
  }

  async onFileSelected(event) {
    const file: File = event.target.files[0]

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append("name", 'aouda'); // for demonstration purposes, but later to pull from LocalStorage

      const fileString = await this.toBase64(file);

      const upload$ = this.http.post(this.baseUrl + '/api/add/enrolment', {
        'name': 'aouda',
        'payload': fileString
      }, {
        observe: 'events',
        reportProgress: true
      })
        .pipe(finalize(() => this.reset()));

      console.log('You\'ve made the request');

      this.uploadSub = upload$.subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        }
      })

      console.log('You\'re about to make the request');


    }
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }

}
