import { environment } from '../../environment/environment';
import { ObjectDrawer } from '../drawers/object-drawer';

export abstract class DrawingAction {
  name : string;
  drawer : ObjectDrawer;

  public getIconUrl() : string{
    return `${environment.iconActionUrl}/${this.name}.svg`
  }
}
