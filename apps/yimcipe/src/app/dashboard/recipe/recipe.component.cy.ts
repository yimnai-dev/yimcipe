import { MountConfig } from 'cypress/angular';
import { RecipeComponent } from './recipe.component';

describe(RecipeComponent.name, () => {
  const config: MountConfig<RecipeComponent> = {
    declarations: [],
    imports: [],
    providers: []
  }

  it('renders', () => {
     cy.mount(RecipeComponent, config);
  })
})
