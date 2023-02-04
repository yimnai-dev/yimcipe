import { MountConfig } from 'cypress/angular';
import { FavouriteComponent } from './favourite.component';

describe(FavouriteComponent.name, () => {
  const config: MountConfig<FavouriteComponent> = {
    declarations: [],
    imports: [],
    providers: []
  }

  it('renders', () => {
     cy.mount(FavouriteComponent, config);
  })
})
