import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {UserFormComponent} from '../user-form/user-form.component';
import {MatButton} from '@angular/material/button';
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
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatChip, MatChipSet} from '@angular/material/chips';

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
    MatPaginator,
    MatChipSet,
    MatChip,
    NgForOf
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  @Input() users: any[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'createdAt', 'tags', 'email', 'description', 'actions'];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openCreateModal(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.users.push(result);
      }
    });
  }

  openEditModal(user: any): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.users.findIndex((u) => u.id === result.id);
        if (index !== -1) {
          this.users[index] = result;
        }
      }
    });
  }

  deleteUser(user: any): void {
    const confirmation = confirm('Are you sure you want to delete this user?');
    if (confirmation) {
      this.users = this.users.filter((u) => u.id !== user.id);
    }
  }

}
