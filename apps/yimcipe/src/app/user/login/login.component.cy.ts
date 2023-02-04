import { MountConfig } from 'cypress/angular';
import { LoginComponent } from './login.component';

describe(LoginComponent.name, () => {
  const config: MountConfig<LoginComponent> = {
    declarations: [],
    imports: [],
    providers: []
  }

  it('renders', () => {
     cy.mount(LoginComponent, config);
  })
})
