import { MountConfig } from 'cypress/angular';
import { PasswordChangeVerificationComponent } from './password-change-verification.component';

describe(PasswordChangeVerificationComponent.name, () => {
  const config: MountConfig<PasswordChangeVerificationComponent> = {
    declarations: [],
    imports: [],
    providers: []
  }

  it('renders', () => {
     cy.mount(PasswordChangeVerificationComponent, {
           ...config,
           componentProperties: {
               email:  'neruszaumuy@gmail.com',
          }
       });
  })
})
