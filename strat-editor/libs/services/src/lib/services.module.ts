import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentService } from './agent.service';
import { AuthentService } from './authent.service';
import { DrawerActionService } from './drawer-action.service';
import { FontService } from './font.service';
import { GalleryService } from './gallery.service';
import { NotificationService } from './notifications.service';
import { StratService } from './strat.service';
import { UserService } from './user.service';
import { MapService } from './map.service';

@NgModule({
  imports: [CommonModule],
  exports: [
    AgentService,
    AuthentService,
    DrawerActionService,
    FontService,
    GalleryService,
    NotificationService,
    StratService,
    UserService,
    MapService,
  ],
})
export class ServicesModule {}
