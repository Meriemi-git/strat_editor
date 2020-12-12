export class Color {
  public r: number = 0;
  public g: number = 0;
  public b: number = 0;
  public a: number = 1;
  public roundA: number;
  public hex: string = '000000';

  public static rgba = (color: Color): string => {
    return `rgba(${color.r},${color.g},${color.b},${color.a})`;
  };
}
