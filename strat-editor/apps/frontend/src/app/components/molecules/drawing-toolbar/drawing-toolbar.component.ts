import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DrawingMode } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-drawing-toolbar',
  templateUrl: './drawing-toolbar.component.html',
  styleUrls: ['./drawing-toolbar.component.scss'],
})
export class DrawingToolbarComponent {
  @Input() isConnected: boolean;
  @Output() enableSelectMode = new EventEmitter<void>();
  @Output() enableDrawingMode = new EventEmitter<void>();
  @Output() enableDraggingMode = new EventEmitter<void>();
  @Output() saveStrat = new EventEmitter<void>();
  @Output() showInfos = new EventEmitter<void>();
  @Output() openStrat = new EventEmitter<void>();
  @Output() deleteStrat = new EventEmitter<void>();

  @ViewChild('toolbar') toolbar: ElementRef;
  @ViewChild('toolbarIcon') toolbarIcon: ElementRef;
  public toolbarIconName: string = 'keyboard_arrow_up';
  private toolbarOpened: boolean = false;
  public DrawingModeEnum = DrawingMode;

  constructor(private renderer: Renderer2) {}

  public toogleToolbar() {
    this.toolbarOpened = !this.toolbarOpened;
    if (this.toolbarOpened) {
      this.renderer.removeClass(
        this.toolbar.nativeElement,
        'toolbar-invisible'
      );
      this.toolbarIconName = 'keyboard_arrow_down';
      this.renderer.addClass(this.toolbar.nativeElement, 'toolbar-visible');
      this.renderer.addClass(this.toolbarIcon.nativeElement, 'icon-rotated');
    } else {
      this.toolbarIconName = 'keyboard_arrow_up';
      this.renderer.removeClass(this.toolbar.nativeElement, 'toolbar-visible');
      this.renderer.addClass(this.toolbar.nativeElement, 'toolbar-invisible');
      this.renderer.removeClass(this.toolbarIcon.nativeElement, 'icon-rotated');
    }
  }
}
