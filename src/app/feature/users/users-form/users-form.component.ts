import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Users } from '../../../core/interfaces/users';

// Interface para la imagen
interface UserFormPayload {
  user: Users;
  file?: File;
}

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.scss'
})



export class UsersFormComponent implements OnChanges {

  selectedFile!: File;
  previewUrl: string | null = null;


  @Input() visible: boolean = false;
  @Input() user: Users | null = null;

  @Output() cancel = new EventEmitter<void>();
  @Output() create = new EventEmitter<UserFormPayload>();
  @Output() update = new EventEmitter<UserFormPayload>();


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
      window.alert('El nombre es obligatorio y solo puede contener letras, espacios, tildes y "ñ".');
      return;
    }

    if (!last_name || !nameRegex.test(last_name.trim())) {
      window.alert('El apellido es obligatorio y solo puede contener letras, espacios, tildes y "ñ".');
      return;
    }

    if (!document_type) {
      window.alert('Debe seleccionar un tipo de documento.');
      return;
    }

    if (!document_number) {
      window.alert('Debe ingresar el número de documento.');
      return;
    }

    const docNum = document_number.trim();
    if (document_type === 'DNI' && !/^\d{8}$/.test(docNum)) {
      window.alert('El DNI debe tener exactamente 8 dígitos numéricos.');
      return;
    }

    if (document_type === 'CNE' && !/^\d{20}$/.test(docNum)) {
      window.alert('El CNE debe tener exactamente 20 dígitos numéricos.');
      return;
    }

    if (!cellphone || !/^\d{9}$/.test(cellphone.trim())) {
      window.alert('El teléfono debe tener exactamente 9 dígitos numéricos.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com|yahoo\.com)$/;
    if (!email || !emailRegex.test(email.trim())) {
      window.alert('Debe ingresar un correo válido de gmail, hotmail, outlook o yahoo.');
      return;
    }

    if (!role) {
      window.alert('Debe seleccionar un rol.');
      return;
    }

    // === Si estás editando un usuario ===
    const payload: UserFormPayload = {
      user: { ...this.formUser },
      file: this.selectedFile
    };

    if (this.user) {
      this.update.emit(payload); // usuario ya existe
    } else {
      delete payload.user.users_id; // asegurarse de no mandar ID si es nuevo
      this.create.emit(payload);
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

  // Vista previa de las imagenes

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      // Mostrar vista previa (opcional)
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

}
