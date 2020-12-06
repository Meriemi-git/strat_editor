import { environment } from '../../../environments/environment';
import { ObjectDrawer } from '../object-drawer';

export abstract class DrawingAction {
  name : string;
  drawer : ObjectDrawer;

  public getIconUrl() : string{
    return `${environment.iconActionUrl}/${this.name}.svg`
  }


}
