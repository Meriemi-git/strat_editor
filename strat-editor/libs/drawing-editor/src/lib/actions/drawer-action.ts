import { environment } from '../../environments/environment';

export abstract class DrawerAction {
  name: string;
  public getIconUrl(): string {
    return `${environment.iconActionPath}/${this.name}.svg`;
  }
}
