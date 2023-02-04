import { MountConfig } from 'cypress/angular';
import { RecipeCardComponent } from './recipe-card.component';

describe(RecipeCardComponent.name, () => {
  const config: MountConfig<RecipeCardComponent> = {
    declarations: [],
    imports: [],
    providers: []
  }

  it('renders', () => {
     cy.mount(RecipeCardComponent, config);
  })
})
