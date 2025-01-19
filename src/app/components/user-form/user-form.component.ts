import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {NgForOf, NgIf} from '@angular/common';
import {MatChip, MatChipsModule} from '@angular/material/chips';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {User} from '../../models/user.interface';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatError,
    MatFormField,
    MatButton,
    MatInput,
    NgIf,
    MatDialogClose,
    MatChip,
    MatIcon,
    MatChipsModule,
    MatIconModule,
    NgForOf
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  isEditMode: boolean;
  userForm!: FormGroup;
  separatorKeysCodes: number[] = [13, 188];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User, isEditMode: boolean }
  ) {
    this.isEditMode = data.isEditMode;
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: [this.data?.user?.firstName || '', [Validators.required, Validators.maxLength(100)]],
      lastName: [this.data?.user?.lastName || '', [Validators.required, Validators.maxLength(100)]],
      email: [this.data?.user?.email || '', [Validators.required, Validators.email, Validators.maxLength(100)]],
      description: [this.data?.user?.description || '', [Validators.maxLength(1000)]],
      tags: [this.data?.user?.tags || ['Extra 100 daily credits','Accessibility']],
    });
  }
  get title(): string {
    return this.isEditMode ? 'Edit user info' : 'Create user';
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedData = { ...this.data, ...this.userForm.value };
      this.dialogRef.close(updatedData);
    }
  }

  addTag(event: any): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const tags = this.userForm.get('tags')?.value || [];
      this.userForm.patchValue({ tags: [...tags, value.trim()] });
    }

    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const tags = this.userForm.get('tags')?.value || [];
    const index = tags.indexOf(tag);

    if (index >= 0) {
      tags.splice(index, 1);
      this.userForm.patchValue({ tags });
    }
  }
}
