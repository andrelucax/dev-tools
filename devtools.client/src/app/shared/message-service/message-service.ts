import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarMessage, SnackbarMessageOptions } from './snackbar-message/snackbar-message';
import { auditTime, Subject } from 'rxjs';

type MessageType = 'success' | 'error';

interface MessageEvent {
  type: MessageType;
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly snackBar = inject(MatSnackBar);

  private message$ = new Subject<MessageEvent>();

  constructor() {
    this.message$
      .pipe(
        auditTime(250)
      )
      .subscribe(msg => {
        this.show(msg);
      });
  }

  private getOptions(message: string, panelClass: string, duration: number = 3000): MatSnackBarConfig<SnackbarMessageOptions> {
    return {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: panelClass,
      duration: duration,
      data: {
        message: message
      }
    };
  }

  showSuccess(message: string) {
    this.message$.next({ type: 'success', message });
  }

  showError(message: string) {
    this.message$.next({ type: 'success', message, duration: 0 });
  }

  private show(msg: MessageEvent) {
    this.snackBar.openFromComponent(
      SnackbarMessage,
      this.getOptions(
        msg.message,
        msg.type == 'success' ? 'snackbar-success' : 'snackbar-error',
        msg.duration
      )
    );
  }
}
