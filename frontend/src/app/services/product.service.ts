import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) {}

  // Header pour Authorization
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  }

  getAll(): Observable<any> {
    return this.http.get(this.api, { headers: this.getAuthHeaders() });
  }

  get(id: number): Observable<any> {
    return this.http.get(`${this.api}/${id}`, { headers: this.getAuthHeaders() });
  }

  create(data: any): Observable<any> {
    // Si data est un FormData, Angular gère le Content-Type automatiquement
    return this.http.post(this.api, data, { headers: this.getAuthHeaders() });
  }

 update(id: number, data: any): Observable<any> {
  // Si data est FormData, ajouter _method
  if (data instanceof FormData) {
    data.append('_method', 'PUT'); // Laravel traitera comme PUT
    return this.http.post(`${this.api}/${id}`, data, { headers: this.getAuthHeaders() });
  } else {
    // si JSON classique
    return this.http.put(`${this.api}/${id}`, data, { headers: this.getAuthHeaders() });
  }
}

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`, { headers: this.getAuthHeaders() });
  }
}
