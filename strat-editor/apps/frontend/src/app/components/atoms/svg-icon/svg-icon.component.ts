import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconHelperService } from '@strat-editor/drawing-editor';

@Component({
  selector: 'strat-editor-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss'],
})
export class SvgIconComponent implements OnInit {
  @Input() name: string;
  @Input() width: string;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public ihs: IconHelperService
  ) {}

  ngOnInit(): void {
    console.log('icon name: ', this.name);
    this.matIconRegistry.addSvgIcon(
      this.name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.ihs.getSvgIconByName(this.name)
      )
    );
  }
}
