import { Component, OnInit, inject } from '@angular/core';
import { UsersFormComponent } from '../users-form/users-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../core/services/users.service';
import { Users } from '../../../core/interfaces/users';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-users-list',
  imports: [UsersFormComponent, FormsModule, CommonModule],
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  
  constructor(private alertService: AlertService) {}
  arrova = "@";

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
      this.filteredUsers = [...this.users];
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

  createUser(user: Users) {
  this.userService.save(user).subscribe({
    next: () => {
      this.loadUsers();
      this.closeUserForm();
    },
    error: (err) => {
      console.error('Error creando usuario:', err);
    }
  });
}


  updateUser(user: Users) {
    this.userService.update(user).subscribe(() => {
      this.loadUsers();
      this.closeUserForm();
    });
  }

  editUser(user: Users) {
    this.openUserForm(user);
  }

  deleteUser(users_id: number) {
  this.alertService.confirmDelete().then((result) => {
    if (result.isConfirmed) {
      this.userService.delete(users_id).subscribe(() => {
        this.loadUsers();
        this.alertService.success('Usuario eliminado correctamente');
      }, () => {
        this.alertService.error('Ocurrió un error al eliminar');
      });
    }
  });
}

  restoreUser(users_id: number) {
    this.alertService.confirmRestore().then((result)=>{   
      if (result.isConfirmed){
        this.userService.restore(users_id).subscribe(() => {
        this.loadUsers();
        this.alertService.success('Usuario resturado correctamente');
      }, ()  => {
        this.alertService.error('Ocurrio un error al restaurar')
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
        ? user.role.toUpperCase() === this.selectedRole.charAt(0).toUpperCase()
        : true;

      const matchesState = this.selectedState
        ? user.state?.toUpperCase() === this.selectedState.charAt(0).toUpperCase()
        : true;

      return matchesTerm && matchesRole && matchesState;
    });
  }
 

}
