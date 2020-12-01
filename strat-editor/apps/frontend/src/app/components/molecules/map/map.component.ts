import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Map } from '@strat-editor/data';
import { StratEditorState } from '../../../store/reducers';

@Component({
  selector: 'strat-editor-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  map : Map
  constructor(private store : Store<StratEditorState>){

  }
}
