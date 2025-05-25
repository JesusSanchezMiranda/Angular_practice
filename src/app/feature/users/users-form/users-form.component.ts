import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Users } from '../../../core/interfaces/users';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.scss'
})
export class UsersFormComponent implements OnChanges {

  constructor(private alertService: AlertService) {}
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
  const {
    name,
    last_name,
    document_type,
    document_number,
    cellphone,
    email,
    role
  } = this.formUser;

  const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

  if (!name || !nameRegex.test(name.trim())) {
    this.alertService.error('El nombre es obligatorio y solo puede contener letras, espacios, tildes y "ñ".');
    return;
  }

  if (!last_name || !nameRegex.test(last_name.trim())) {
    this.alertService.error('El apellido es obligatorio y solo puede contener letras, espacios, tildes y "ñ".');
    return;
  }

  if (!document_type) {
    this.alertService.error('Debe seleccionar un tipo de documento.');
    return;
  }

  if (!document_number) {
    this.alertService.error('Debe ingresar el número de documento.');
    return;
  }

  const docNum = document_number.trim();
  if (document_type === 'DNI' && !/^\d{8}$/.test(docNum)) {
    this.alertService.error('El DNI debe tener exactamente 8 dígitos numéricos.');
    return;
  }

  if (document_type === 'CNE' && !/^\d{20}$/.test(docNum)) {
    this.alertService.error('El CNE debe tener exactamente 20 dígitos numéricos.');
    return;
  }

  if (!cellphone || !/^\d{9}$/.test(cellphone.trim())) {
    this.alertService.error('El teléfono debe tener exactamente 9 dígitos numéricos.');
    return;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com|yahoo\.com)$/;
  if (!email || !emailRegex.test(email.trim())) {
    this.alertService.error('Debe ingresar un correo válido de gmail, hotmail, outlook o yahoo.');
    return;
  }

  if (!role) {
    this.alertService.error('Debe seleccionar un rol.');
    return;
  }

  // Si pasa validaciones
  if (this.user) {
    this.update.emit(this.formUser);
  } else {
    const newUser = { ...this.formUser };
    delete newUser.users_id;
    this.create.emit(newUser);
    this.resetForm();
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
