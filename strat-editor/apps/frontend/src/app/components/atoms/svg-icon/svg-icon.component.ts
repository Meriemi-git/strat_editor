import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconHelperService } from '@strat-editor/drawing-editor';

@Component({
  selector: 'strat-editor-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss'],
})
export class SvgIconComponent implements OnInit, AfterViewInit {
  @Input() name: string;
  @Input() width: string;
  @Input() height: string;
  @ViewChild('icon', { static: false }) divIcon: ElementRef;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public ihs: IconHelperService,
    private renderer: Renderer2
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

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.divIcon.nativeElement, 'width', this.width);
    this.renderer.setStyle(
      this.divIcon.nativeElement,
      'height',
      this.height ? this.height : this.width
    );
  }
}
