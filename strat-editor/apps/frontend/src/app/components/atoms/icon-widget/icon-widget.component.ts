import { Component, Input,Output, OnInit, EventEmitter } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from "@angular/platform-browser";


@Component({
  selector: 'strat-editor-icon',
  templateUrl: './icon-widget.component.html',
  styleUrls: ['./icon-widget.component.scss']
})
export class IconWidgetComponent implements OnInit{
  @Input() iconName : string;
  @Input() iconUrl : string;

  @Output() iconClicked = new EventEmitter<void>()

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    console.log("iconName",this.iconName),
    console.log("iconUrl",this.iconUrl),
    this.matIconRegistry.addSvgIcon(
      this.iconName,
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.iconUrl))
  }

  onClick(){
    this.iconClicked.emit();
  }
}
