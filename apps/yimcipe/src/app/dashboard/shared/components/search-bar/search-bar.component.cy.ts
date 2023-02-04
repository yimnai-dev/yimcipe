import { MountConfig } from 'cypress/angular';
import { SearchBarComponent } from './search-bar.component';

describe(SearchBarComponent.name, () => {
  const config: MountConfig<SearchBarComponent> = {
    declarations: [],
    imports: [],
    providers: []
  }

  it('renders', () => {
     cy.mount(SearchBarComponent, config);
  })
})
