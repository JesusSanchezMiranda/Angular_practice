import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Users } from '../../../core/interfaces/users';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.scss'
})
export class UsersFormComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() user: Users | null = null;

  @Output() cancel = new EventEmitter<void>();
  @Output() create = new EventEmitter<Users>();
  @Output() update = new EventEmitter<Users>();

  formUser: Users = this.getEmptyUser();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      this.formUser = this.user ? { ...this.user } : this.getEmptyUser();
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    if (this.user) {
      this.update.emit(this.formUser);
    } else {
      const newUser = { ...this.formUser };
      delete newUser.users_id;
      this.create.emit(newUser);
      this.resetForm(); // opcional limpiar aquí mismo si quieres
    }
  }

  resetForm() {
    this.formUser = this.getEmptyUser();
  }

  private getEmptyUser(): Users {
    return {
      name: '',
      last_name: '',
      document_type: '',
      document_number: '',
      cellphone: '',
      email: '',
      role: '',
      state: 'A',
      registration_date: ''
    } as Users;
  }
}
