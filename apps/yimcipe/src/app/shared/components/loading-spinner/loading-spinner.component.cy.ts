import { MountConfig } from 'cypress/angular';
import { LoadingSpinnerComponent } from './loading-spinner.component';

describe(LoadingSpinnerComponent.name, () => {
  const config: MountConfig<LoadingSpinnerComponent> = {
    declarations: [],
    imports: [],
    providers: []
  }

  it('renders', () => {
     cy.mount(LoadingSpinnerComponent, config);
  })
})
