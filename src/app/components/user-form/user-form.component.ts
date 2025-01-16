import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';

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
    NgIf
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: [this.data?.firstName || '', [Validators.required, Validators.maxLength(100)]],
      lastName: [this.data?.lastName || '', [Validators.required, Validators.maxLength(100)]],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      description: [this.data?.description || '', [Validators.maxLength(1000)]],
      tags: [this.data?.tags || []],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.dialogRef.close({ ...this.data, ...this.userForm.value });
    }
  }
}
