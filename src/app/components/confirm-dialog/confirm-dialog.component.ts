import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  template: `
    <mat-dialog-content>
      <p>Are you sure you want to delete user <span>{{ data.firstName }} {{ data.lastName }}</span>?</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="warn" class="btn-action" (click)="onConfirm()">Delete</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      @import '../../shared/styles/button.styles.scss';
      mat-dialog-content p {
        font-family: 'Nunito', sans-serif;
        font-size: 22px;
        font-weight: 900;
        line-height: 28px;
        margin: 10px 0;
        span {
          font-weight: 400;
        }
      }
    `,
  ],
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { firstName: string; lastName: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
