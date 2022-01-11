import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  constructor(private http: HttpClient) {}
  getOneCategorie(id: string) {
    return this.http.get(`http://localhost:3000/api/categorie/${id}`);
  }
  addCategorie(club: any) {
    return this.http.post('http://localhost:3000/api/categorie', club);
  }
  getCategorie() {
    return this.http.get('http://localhost:3000/api/categorie/');
  }
}
