import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { UserInfos, Map, Floor } from '@strat-editor/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'strat-editor-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  @Input() $userInfos: Observable<UserInfos>;
  @Input() maps: Map[];
  @Input() floors: Floor[];

  @Input() selectedMap: Map;
  @Input() selectedFloor: Floor;

  @Output() disconnect = new EventEmitter<void>();
  @Output() mapSelected = new EventEmitter<Map>();
  @Output() floorSelected = new EventEmitter<Floor>();

  public onEditorPage: boolean;
  public userInfos: UserInfos;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.$userInfos.subscribe((userInfos) => {
      this.userInfos = userInfos;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.onEditorPage = event.url.includes('editor');
      }
    });
  }

  onAccountClick() {
    this.router.navigateByUrl('/account');
  }
  onDisconnectClick() {
    this.disconnect.emit();
  }

  onLoginClick() {
    this.router.navigateByUrl('/login');
  }

  onRegisterClick() {
    this.router.navigateByUrl('/register');
  }

  onHomeClick() {
    this.router.navigateByUrl('/');
  }

  onMapSelected(map: Map) {
    this.mapSelected.emit(map);
  }

  onFloorSelected(floor: Floor) {
    this.floorSelected.emit(floor);
  }
}
