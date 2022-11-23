import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipes = [
    {title: 'Corn flour and Huckle berry(Kati kati)', excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam elit, bibendum vel nunc ut, lobortis consectetur arcu. Sed commodo ante tristique velit scelerisqu..',},
    {title: 'Corn flour and Huckle berry(Kati kati)', excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam elit, bibendum vel nunc ut, lobortis consectetur arcu. Sed commodo ante tristique velit scelerisqu..',},
    {title: 'Corn flour and Huckle berry(Kati kati)', excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam elit, bibendum vel nunc ut, lobortis consectetur arcu. Sed commodo ante tristique velit scelerisqu..',},
  ]

  constructor() { }
}
