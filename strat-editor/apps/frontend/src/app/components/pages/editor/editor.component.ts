import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Agent, Map } from '@strat-editor/data';
import { Observable } from 'rxjs';
import * as SidenavSelectors from '../../../store/selectors/sidenav.selector';
import * as SidenavActions from '../../../store/actions/sidenav.action';
import * as AgentActions from '../../../store/actions/agent.action';
import * as AgentSelectors from '../../../store/selectors/agent.selector';
import * as MapActions from '../../../store/actions/map.action';
import * as MapSelectors from '../../../store/selectors/map.selector';
import { StratEditorState } from '../../../store/reducers';
import { MapPanelComponent } from '../../molecules/map-panel/map-panel.component';

@Component({
  selector: 'strat-editor-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  leftIsOpened: boolean;
  rightIsOpened: boolean;
  $agents : Observable<Agent[]>
  $maps : Observable<Map[]>
  isMapSelected : boolean;

  @ViewChild("mapPanel") mapPanel : MapPanelComponent;

  constructor(private store : Store<StratEditorState>,private renderer : Renderer2){}

  ngOnInit(): void {
    this.store.select(SidenavSelectors.isLeftSidenavOpened).subscribe(isOpened => {
      this.leftIsOpened = isOpened
    })
    this.store.select(SidenavSelectors.isRightSidenavOpened).subscribe(isOpened => {
      this.rightIsOpened = isOpened
    })
    this.$agents = this.store.select(AgentSelectors.selectAll);
    this.$maps = this.store.select(MapSelectors.selectAll);
    this.store.dispatch(AgentActions.FetchAgents());
    this.store.dispatch(MapActions.FetchMaps());
  }

  toggleLeftSidenav(){
    this.store.dispatch(SidenavActions.toggleLeft())
  }

  toggleRightSidenav(){
    this.store.dispatch(SidenavActions.toggleRight())
  }

  onMapSelected(map : Map){
    this.store.dispatch(MapActions.SelectMap({selectedMap : map}));
    this.isMapSelected = true;
  }

  onCloseLeftSidenav(){
    this.store.dispatch(SidenavActions.toggleLeft())
  }

  onCloseRightSidenav(){
    this.store.dispatch(SidenavActions.toggleRight())
  }

  onDrawingActionCalled(actionName : string){
    console.log("DrawingActionCalled : " + actionName);
    this.mapPanel.updatePointerIcon(actionName);
  }
}
