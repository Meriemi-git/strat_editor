import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DrawingError } from '@strat-editor/data';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor() {}

  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof DrawingError) {
      console.error('It happens: ', error);
    }
  }
}
