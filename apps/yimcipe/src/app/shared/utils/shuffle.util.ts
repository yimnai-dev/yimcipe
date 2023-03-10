import { BehaviorSubject } from 'rxjs';
export function shuffleRecipes<T extends BehaviorSubject<any[]>>(recipes: T): T {
  for (let i = recipes.getValue().length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = recipes.getValue()[i];
    recipes.getValue()[i] = recipes.getValue()[j];
    recipes.getValue()[j] = temp;
  }
  return recipes;
}
