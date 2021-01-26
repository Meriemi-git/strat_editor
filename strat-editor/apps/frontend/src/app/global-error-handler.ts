import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MapLoadingError, NotificationType } from '@strat-editor/data';
import { Store } from '@ngrx/store';
import { NotificationService } from './services/notifications.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse) {
    const store = this.injector.get(Store);
    const notificationService = this.injector.get(NotificationService);
    if (error instanceof MapLoadingError) {
      notificationService.displayNotification({
        message: error.message,
        type: NotificationType.error,
      });
    }
  }
}
