import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private api = 'http://localhost:8000/api/cart';

  constructor(private http: HttpClient) {}

  // Génère les headers avec JWT
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // token stocké après login
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  }

  // Récupérer le panier
  getCart(): Observable<any> {
    return this.http.get(this.api, { headers: this.getAuthHeaders() });
  }

  // Ajouter un produit au panier
  add(productId: number, qty: number = 1): Observable<any> {
    return this.http.post(`${this.api}/add`, 
      { product_id: productId, quantity: qty }, 
      { headers: this.getAuthHeaders() }
    );
  }

  // Supprimer un produit du panier
  remove(cartItemId: number): Observable<any> {
    return this.http.delete(`${this.api}/${cartItemId}`, { headers: this.getAuthHeaders() });
  }
}
