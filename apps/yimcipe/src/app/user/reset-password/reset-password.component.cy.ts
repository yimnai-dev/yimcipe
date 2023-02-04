import { MountConfig } from 'cypress/angular';
import { ResetPasswordComponent } from './reset-password.component';

describe(ResetPasswordComponent.name, () => {
  const config: MountConfig<ResetPasswordComponent> = {
    declarations: [],
    imports: [],
    providers: []
  }

  it('renders', () => {
     cy.mount(ResetPasswordComponent, config);
  })
})
