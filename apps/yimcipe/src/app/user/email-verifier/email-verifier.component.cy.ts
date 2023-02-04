import { MountConfig } from 'cypress/angular';
import { EmailVerifierComponent } from './email-verifier.component';

describe(EmailVerifierComponent.name, () => {
  const config: MountConfig<EmailVerifierComponent> = {
    declarations: [],
    imports: [],
    providers: []
  }

  it('renders', () => {
     cy.mount(EmailVerifierComponent, config);
  })
})
