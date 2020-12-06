import { environment } from '../../environments/environment';

export abstract class DrawingAction {
  name : string;
  public getIconUrl() : string{
    return `${environment.iconActionUrl}/${this.name}.svg`
  }
}
