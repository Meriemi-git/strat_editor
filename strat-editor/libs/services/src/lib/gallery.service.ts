import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Image } from '@strat-editor/data';
@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private controller = 'gallery';
  constructor(private http: HttpClient) {}

  getImages(): Observable<Image[]> {
    return this.http
      .get<Image[]>(environment.apiUrl + this.controller + '/images')
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  uploadImage(image: File): Observable<Image> {
    let formData = new FormData();
    formData.append('image', image);
    return this.http
      .post<Image>(environment.apiUrl + this.controller + '/upload', formData)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
