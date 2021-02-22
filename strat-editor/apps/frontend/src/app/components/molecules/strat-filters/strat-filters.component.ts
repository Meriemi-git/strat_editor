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
  public favorite: boolean = false;
  public allSelected = false;
  public stratName: string;
  public selectedMapIds: string[];
  public sortedBy: string = 'name';
  public order: string = 'asc';

  constructor() {}

  ngOnInit(): void {}

  public onMapsSelected(selectedMaps: Map[]) {
    this.selectedMapIds = selectedMaps
      .filter((map) => map)
      .map((map) => {
        return map._id;
      });
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
      mapIds:
        this.selectedMapIds == null || this.selectedMapIds.length == 0
          ? this.maps.map((map) => {
              return map._id;
            })
          : this.selectedMapIds,
      name: this.stratName,
      order: this.order,
      sortedBy: this.sortedBy,
    } as StratFilter);
  }
}
