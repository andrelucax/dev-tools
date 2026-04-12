import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

export interface SnackbarMessageOptions {
  message: string;
}

@Component({
  selector: 'dt-snackbar-message',
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './snackbar-message.html',
  styleUrl: './snackbar-message.scss',
})
export class SnackbarMessage {
  protected readonly data = inject(MAT_SNACK_BAR_DATA) as SnackbarMessageOptions;
  protected readonly snackBarRef = inject(MatSnackBarRef<SnackbarMessage>);

  protected close() {
    this.snackBarRef.dismiss();
  }
}
