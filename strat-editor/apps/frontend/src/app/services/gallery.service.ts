import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private controller = 'gallery';
  constructor(private http: HttpClient) {}

  getAllImages(userId: string): Observable<string[]> {
    return this.http
      .post<string[]>(environment.apiUrl + this.controller + '/images', userId)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  uploadImage(image: File) {
    let formData = new FormData();
    formData.append('file', image);
    return this.http
      .post<string[]>(
        environment.apiUrl + this.controller + '/upload',
        formData
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(err);
        })
      )
      .subscribe((result) => console.log(result));
  }
}
