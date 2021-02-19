import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Map, StratFilter } from '@strat-editor/data';

@Component({
  selector: 'strat-editor-strat-filters',
  templateUrl: './strat-filters.component.html',
  styleUrls: ['./strat-filters.component.scss'],
})
export class StratFiltersComponent implements OnInit {
  @Input() maps: Map[];
  @Output() filter = new EventEmitter<StratFilter>();
  @ViewChild('mapSelector') mapSelector: MatSelect;
  public favorite: boolean;
  public allSelected = false;
  public stratName: string;
  public selectedMapIds: string[];

  constructor() {}

  ngOnInit(): void {}

  public onMapsSelected(event: any) {
    console.log('onMapsSelected', event);
  }

  public toggleAllSelection() {
    this.allSelected = !this.allSelected;
    if (this.allSelected) {
      this.mapSelector.options.forEach((item: MatOption) => item.select());
    } else {
      this.mapSelector.options.forEach((item: MatOption) => {
        item.deselect();
      });
    }
    this.mapSelector.close();
  }

  public onFilter() {
    this.filter.emit({
      favorites: this.favorite,
      mapIds: this.selectedMapIds,
      name: this.stratName,
      order: 'asc',
      orderBy: 'likes',
    } as StratFilter);
  }
}
