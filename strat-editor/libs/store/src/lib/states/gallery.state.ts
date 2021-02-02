import { HttpErrorResponse } from '@angular/common/http';
import { Image } from '@strat-editor/data';
export interface GalleryState {
  images: Image[];
  draggedImage: Image;
  error: HttpErrorResponse;
}
