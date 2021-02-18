import { Injectable, SecurityContext } from '@angular/core';
import { environment } from '../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { Floor } from '@strat-editor/data';

@Injectable()
export class ImageHelperService {
  constructor(private domSanitizer: DomSanitizer) {}
  getSvgIconByName(iconName: string): string {
    return this.domSanitizer.sanitize(
      SecurityContext.URL,
      `${environment.apiUrl}icon/image/${iconName}`
    );
  }

  getAgentImageByName(iconName: string): string {
    return this.domSanitizer.sanitize(
      SecurityContext.URL,
      `${environment.apiUrl}agent/badge/${iconName}`
    );
  }

  getGalleryImageByName(imageName: string): string {
    return this.domSanitizer.sanitize(
      SecurityContext.URL,
      `${environment.apiUrl}gallery/image/${imageName}`
    );
  }

  getFloorImage(floor: Floor): string {
    return this.domSanitizer.sanitize(
      SecurityContext.URL,
      `${environment.apiUrl}floor/image/${floor.image}`
    );
  }
}
