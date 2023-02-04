import { MountConfig } from 'cypress/angular';
import { PersonalComponent } from './personal.component';

describe(PersonalComponent.name, () => {
  const config: MountConfig<PersonalComponent> = {
    declarations: [],
    imports: [],
    providers: []
  }

  it('renders', () => {
     cy.mount(PersonalComponent, config);
  })
})
