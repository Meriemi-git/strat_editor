import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification, NotificationType } from '@strat-editor/data';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private $notifications = new Subject<Notification>();

  public displayNotification(notification: Notification): void {
    this.$notifications.next(notification);
  }

  constructor(private toastr: ToastrService) {
    this.$notifications.subscribe(
      (notification) => {
        switch (notification.type) {
          case NotificationType.success:
            this.toastr.success(notification.message);
            break;
          case NotificationType.error:
            this.toastr.error(notification.message);
            break;
          case NotificationType.warning:
            this.toastr.warning(notification.message);
            break;
          case NotificationType.info:
          default:
            this.toastr.info(notification.message);
            break;
        }
      },
      (error) => {
        console.log('Error when processing notification message');
      }
    );
  }
}
