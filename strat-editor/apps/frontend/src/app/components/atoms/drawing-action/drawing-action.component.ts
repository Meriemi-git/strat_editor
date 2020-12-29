import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DrawerAction } from '@strat-editor/drawing-editor';
import { IconHelperService } from '@strat-editor/drawing-editor';
@Component({
  selector: 'strat-editor-drawing-action',
  templateUrl: './drawing-action.component.html',
  styleUrls: ['./drawing-action.component.scss'],
})
export class DrawingActionComponent {
  @Input() action: DrawerAction;
  @Output() actionSelected = new EventEmitter<DrawerAction>();

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public ihs: IconHelperService
  ) {}

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon(
      this.action.name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.ihs.getSvgIconByName(this.action.name)
      )
    );
  }

  onClick() {
    this.actionSelected.emit(this.action);
  }
}
