import { inject, Injectable } from '@angular/core';

// Nuevos imports
import { HttpClient } from '@angular/common/http';
import { Users } from '../interfaces/users'; // Asegúrate de que este archivo exista
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() {}

  private http = inject(HttpClient);
  private urlBackEnd = `${environment.urlBackEnd}/v1/api/users`; 

  findAll(): Observable<Users[]> {
    return this.http.get<Users[]>(this.urlBackEnd);
  }

  findByState(state: string): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.urlBackEnd}/estado/${state}`);
  }

  findById(usersId: number): Observable<Users> {
    return this.http.get<Users>(`${this.urlBackEnd}/${usersId}`);
  }

  save(user: Users): Observable<Users> {
    return this.http.post<Users>(`${this.urlBackEnd}/save`, user);
  }

  update(user: Users): Observable<Users> {
    return this.http.put<Users>(`${this.urlBackEnd}/update`, user);
  }

  delete(usersId: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBackEnd}/delete/${usersId}`);
  }

  restore(usersId: number): Observable<void> {
    return this.http.put<void>(`${this.urlBackEnd}/restore/${usersId}`, {});
  }


}
