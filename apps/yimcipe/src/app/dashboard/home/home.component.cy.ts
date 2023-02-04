import { MountConfig } from 'cypress/angular';
import { HomeComponent } from './home.component';

describe(HomeComponent.name, () => {
  const config: MountConfig<HomeComponent> = {
    declarations: [],
    imports: [],
    providers: []
  }

  it('renders', () => {
     cy.mount(HomeComponent, config);
  })
})
