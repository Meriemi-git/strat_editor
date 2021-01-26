export class DrawingError implements Error {
  name: string;
  stack?: string;
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}
