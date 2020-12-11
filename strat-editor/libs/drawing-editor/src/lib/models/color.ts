export class Color {
  r: number = 0;
  g: number = 0;
  b: number = 0;
  a: number = 1;
  roundA: number;
  hex: string = '000000';
  rgba = (): string => {
    return `rgba(${this.r},${this.g},${this.b},${this.a})`;
  };
}
