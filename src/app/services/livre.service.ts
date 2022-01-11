import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class livreService {
  constructor(private http: HttpClient) {}
  getOnelivre(id: string) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=UTF-8'
    );
    let options = { headers: headers };
    return this.http.get(`http://localhost:3000/api/livres/${id}`, options);
  }

  addlivre(id: string, livre: any) {
    console.log(livre);
    return this.http.post(`http://localhost:3000/api/livres/${id}`, livre);
  }
  getlivre(id: any) {
    return this.http.get(`http://localhost:3000/api/livres/${id}`);
  }
  saveDownload(data: any) {
    console.log(data);
    return this.http.post(`http://localhost:3000/api/auth/`, data);
  }
}
