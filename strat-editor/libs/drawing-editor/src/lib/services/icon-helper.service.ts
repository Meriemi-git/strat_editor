import { Injectable, SecurityContext } from '@angular/core';
import { environment } from '../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class IconHelperService {
  constructor(private domSanitizer: DomSanitizer) {}
  getSvgIconByName(iconName: string): string {
    return this.domSanitizer.sanitize(
      SecurityContext.URL,
      `${environment.apiUrl}icon/image/${iconName}`
    );
  }
}
