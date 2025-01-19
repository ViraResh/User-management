import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {UserFormComponent} from '../user-form/user-form.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {DatePipe, NgForOf} from '@angular/common';
import {MatChip, MatChipSet, MatChipsModule} from '@angular/material/chips';
import {MatIcon} from '@angular/material/icon';
import {User} from '../../models/user.interface';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatButton,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatCellDef,
    MatHeaderCellDef,
    DatePipe,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatChipSet,
    MatChip,
    NgForOf,
    MatIcon,
    MatIconButton,
    MatChipsModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  @Input() users: User[] = [];
  @Output() onDelete = new EventEmitter<User>();
  @Output() onEdit = new EventEmitter<User>();
  @Output() onAdd = new EventEmitter<User>();

  displayedColumns: string[] = ['firstName', 'lastName', 'createdAt', 'email', 'tags', 'description', 'actions'];

  constructor(private dialog: MatDialog) {}

  openAddModal(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '770px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onAdd.emit(result);
      }
    });
  }

  openEditModal(user: User): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '770px',
      data: { user, isEditMode: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onEdit.emit(result);
      }
    });
  }

  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: 'auto',
      data: { firstName: user.firstName, lastName: user.lastName },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.onDelete.emit(user);
      }
    });
  }
}
