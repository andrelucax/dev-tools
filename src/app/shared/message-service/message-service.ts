import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarMessage, SnackbarMessageOptions } from './snackbar-message/snackbar-message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly snackBar = inject(MatSnackBar);

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
    this.snackBar.openFromComponent(SnackbarMessage, this.getOptions(message, 'snackbar-success'));
  }

  showError(message: string) {
    this.snackBar.openFromComponent(SnackbarMessage, this.getOptions(message, 'snackbar-error', 0));
  }
}
