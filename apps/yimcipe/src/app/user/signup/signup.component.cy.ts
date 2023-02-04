import { MountConfig } from 'cypress/angular';
import { SignupComponent } from './signup.component';

describe(SignupComponent.name, () => {
  const config: MountConfig<SignupComponent> = {
    declarations: [],
    imports: [],
    providers: []
  }

  it('renders', () => {
     cy.mount(SignupComponent, config);
  })
})
