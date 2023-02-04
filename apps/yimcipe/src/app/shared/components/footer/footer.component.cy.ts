import { MountConfig } from 'cypress/angular';
import { FooterComponent } from './footer.component';

describe(FooterComponent.name, () => {
  const config: MountConfig<FooterComponent> = {
    declarations: [],
    imports: [],
    providers: []
  }

  it('renders', () => {
     cy.mount(FooterComponent, config);
  })
})
