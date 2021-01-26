import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DrawingError } from '@strat-editor/data';

@Injectable()
export class DrawingErrorHandler implements ErrorHandler {
  constructor() {}

  handleError(error: Error | HttpErrorResponse) {
    console.error('In drawing Error handler: ', error);

    if (error instanceof DrawingError) {
      console.error('It happens: ', error);
    }
  }
}
