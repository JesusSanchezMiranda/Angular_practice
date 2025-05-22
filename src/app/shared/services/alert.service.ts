import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  success(message: string, title: string = 'Éxito') {
    return Swal.fire({
      icon: 'success',
      title,
      text: message,
      confirmButtonColor: '#28a745'
    });
  }

  error(message: string, title: string = 'Error') {
    return Swal.fire({
      icon: 'error',
      title,
      text: message,
      confirmButtonColor: '#dc3545'
    });
  }

  warning(message: string, title: string = 'Advertencia') {
    return Swal.fire({
      icon: 'warning',
      title,
      text: message,
      confirmButtonColor: '#ffc107'
    });
  }

  confirmDelete(message: string = '¿Estás seguro de eliminar este registro?') {
    return Swal.fire({
      title: 'Confirmación',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    });
  }

  confirmRestore(message: string = '¿Deseas restaurar este registro?') {
    return Swal.fire({
      title: 'Restaurar',
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, restaurar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d'
    });
  }
}
