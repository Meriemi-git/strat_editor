export class DrawerColor {
  public r: number = 255;
  public g: number = 255;
  public b: number = 255;
  public a: number = 1;
  public roundA: number;
  public hex: string = 'FFFFFF';

  public static rgba = (color: DrawerColor): string => {
    return `rgba(${color.r},${color.g},${color.b},${color.a})`;
  };
}
