import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { CostComponent } from './cost/cost.component';

const routes: Routes = [
  { path: 'recipes', component: RecipesComponent },
  { path: 'ingredients', component: IngredientsComponent },
  { path: 'cost', component: CostComponent },
  { path: '', redirectTo: '/recipes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
