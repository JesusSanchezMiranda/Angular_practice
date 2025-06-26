import Swal from 'sweetalert2';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { UsersFormComponent } from '../users-form/users-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../core/services/users.service';
import { Users } from '../../../core/interfaces/users';
import { environment } from '../../../../environments/environment';

interface UserFormPayload {
  user: Users;
  file?: File;
}


@Component({
  selector: 'app-users-list',
  imports: [UsersFormComponent, FormsModule, CommonModule],
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @ViewChild(UsersFormComponent) userFormComponent!: UsersFormComponent;

  imageExistsMap: { [key: number]: boolean } = {};

  onImageError(event: Event) {
  const target = event.target as HTMLImageElement;
  target.style.display = 'none'; // Oculta la imagen rota
}





  users: Users[] = [];
  filteredUsers: Users[] = [];

  searchTerm: string = '';
  selectedRole: string = '';
  selectedState: string = '';

  showUserForm = false;
  selectedUser: Users | null = null;

  private userService = inject(UsersService);

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
  this.userService.findAll().subscribe(users => {
    this.users = users;
    this.filteredUsers = users;
  });
}


  openUserForm(user?: Users) {
    this.selectedUser = user ? { ...user } : null;
    this.showUserForm = true;
  }

  closeUserForm() {
    this.showUserForm = false;
    this.selectedUser = null;
  }

  createUser(payload: UserFormPayload) {
    const { user, file } = payload;

    Swal.fire({
      title: 'Crear usuario',
      text: '¿Deseas crear este usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, crear',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d'
    }).then(result => {
      if (result.isConfirmed) {
        this.userService.save(user).subscribe({
          next: (createdUser) => {
            if (file) {
              const formData = new FormData();
              formData.append('file', file);

              this.userService.uploadImage(createdUser.users_id!, formData).subscribe({
                next: () => this.finalizarCreacion(),
                error: () => this.mostrarErrorImagen()
              });
            } else {
              this.finalizarCreacion();
            }
          },
          error: () => this.mostrarErrorCreacion()
        });
      }
    });
  }

  private finalizarCreacion() {
    this.loadUsers();
    this.closeUserForm();
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Usuario creado exitosamente',
      confirmButtonColor: '#28a745'
    });
  }

  private mostrarErrorCreacion() {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Ocurrió un error al crear el usuario',
      confirmButtonColor: '#dc3545'
    });
  }

  private mostrarErrorImagen() {
    Swal.fire({
      icon: 'warning',
      title: 'Imagen no cargada',
      text: 'El usuario fue creado, pero no se pudo subir la imagen.',
      confirmButtonColor: '#f39c12'
    });
  }




  updateUser(payload: UserFormPayload) {
    const { user, file } = payload;

    Swal.fire({
      title: 'Actualizar usuario',
      text: '¿Deseas actualizar este usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#6c757d'
    }).then(result => {
      if (result.isConfirmed) {
        this.userService.update(user).subscribe({
          next: () => {
            if (file) {
              const formData = new FormData();
              formData.append('file', file);

              this.userService.uploadImage(user.users_id!, formData).subscribe({
                next: () => this.finalizarActualizacion(),
                error: () => this.mostrarErrorImagen()
              });
            } else {
              this.finalizarActualizacion();
            }
          },
          error: () => this.mostrarErrorActualizacion()
        });
      }
    });
  }

  private finalizarActualizacion() {
    this.loadUsers();
    this.closeUserForm();
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Usuario actualizado correctamente',
      confirmButtonColor: '#28a745'
    });
  }

  private mostrarErrorActualizacion() {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Ocurrió un error al actualizar el usuario',
      confirmButtonColor: '#dc3545'
    });
  }






  editUser(user: Users) {
    this.openUserForm(user);
  }

  deleteUser(users_id: number) {
    Swal.fire({
      title: 'Confirmación',
      text: '¿Estás seguro de eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then(result => {
      if (result.isConfirmed) {
        this.userService.delete(users_id).subscribe(() => {
          this.loadUsers();
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Usuario eliminado correctamente',
            confirmButtonColor: '#28a745'
          });
        }, () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al eliminar',
            confirmButtonColor: '#dc3545'
          });
        });
      }
    });
  }


  restoreUser(users_id: number) {
    Swal.fire({
      title: 'Restaurar',
      text: '¿Deseas restaurar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, restaurar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d'
    }).then(result => {
      if (result.isConfirmed) {
        this.userService.restore(users_id).subscribe(() => {
          this.loadUsers();
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Usuario restaurado correctamente',
            confirmButtonColor: '#28a745'
          });
        }, () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al restaurar',
            confirmButtonColor: '#dc3545'
          });
        });
      }
    });
  }


  filterUsers() {
    const term = this.searchTerm.toLowerCase();

    this.filteredUsers = this.users.filter(user => {
      const matchesTerm =
        user.name.toLowerCase().includes(term) ||
        user.last_name.toLowerCase().includes(term) ||
        user.document_number.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term);

      const matchesRole = this.selectedRole
        ? user.role.toLowerCase() === this.selectedRole.toLowerCase()
        : true;

      const matchesState = this.selectedState
        ? user.state?.toLowerCase() === this.selectedState.toLowerCase()
        : true;

      return matchesTerm && matchesRole && matchesState;
    });
  }

 getFullImageUrl(imagePath: string): string {
  return `${environment.urlBackEnd}${imagePath}`;
}






}
