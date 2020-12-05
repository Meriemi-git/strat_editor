import { Component, Input,Output, OnInit, EventEmitter } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from "@angular/platform-browser";


@Component({
  selector: 'strat-editor-icon',
  templateUrl: './icon-action-widget.component.html',
  styleUrls: ['./icon-action-widget.component.scss']
})
export class IconWidgetComponent implements OnInit{
  @Input() iconName : string;
  @Output() iconClicked = new EventEmitter<string>()

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon(
      this.iconName,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/" +  this.iconName + ".svg"))
  }

  onClick(){
    this.iconClicked.emit(this.iconName);

  }
}
