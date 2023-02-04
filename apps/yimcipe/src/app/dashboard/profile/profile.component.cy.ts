import { MountConfig } from 'cypress/angular';
import { ProfileComponent } from './profile.component';

describe(ProfileComponent.name, () => {
  const config: MountConfig<ProfileComponent> = {
    declarations: [],
    imports: [],
    providers: []
  }

  it('renders', () => {
     cy.mount(ProfileComponent, config);
  })
})
