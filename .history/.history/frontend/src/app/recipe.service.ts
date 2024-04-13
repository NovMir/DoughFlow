import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseUrl = 'http://localhost:5000/api/recipes';

  constructor(private http: HttpClient) { }

  addRecipe(recipe: any): Observable<any> {
    return this.http.post(this.baseUrl, recipe);
  }

  getRecipes(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
