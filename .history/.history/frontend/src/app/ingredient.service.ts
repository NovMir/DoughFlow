import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private baseUrl = 'http://localhost:5000/api/ingredients';

  constructor(private http: HttpClient) { }

  addIngredient(ingredient: any): Observable<any> {
    return this.http.post(this.baseUrl, ingredient);
  }

  getIngredients(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
