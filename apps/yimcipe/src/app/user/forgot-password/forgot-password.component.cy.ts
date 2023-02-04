import { MountConfig } from 'cypress/angular';
import { ForgotPasswordComponent } from './forgot-password.component';

describe(ForgotPasswordComponent.name, () => {
  const config: MountConfig<ForgotPasswordComponent> = {
    declarations: [],
    imports: [],
    providers: []
  }

  it('renders', () => {
     cy.mount(ForgotPasswordComponent, config);
  })
})
