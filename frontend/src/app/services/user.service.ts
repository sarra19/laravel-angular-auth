import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.auth.getToken()}`,
      'Accept': 'application/json'
    });
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.api}/profile`, { headers: this.getAuthHeaders() });
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.api}/profile`, data, { headers: this.getAuthHeaders() });
  }

  deleteProfile(): Observable<any> {
    return this.http.delete(`${this.api}/profile`, { headers: this.getAuthHeaders() });
  }
}
