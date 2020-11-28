/* eslint-disable @typescript-eslint/no-empty-function */
import "reflect-metadata";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Schema(...args): ClassDecorator {
  return function () {
  }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Prop(...args): PropertyDecorator {
  return function () {
  }
}
export class SchemaFactory {
  createForClass(arg : any) : typeof Schema{
    return;
  }
}
