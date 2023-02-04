import { MountConfig } from 'cypress/angular';
import { DashboardComponent } from './dashboard.component';

describe(DashboardComponent.name, () => {
  const config: MountConfig<DashboardComponent> = {
    declarations: [],
    imports: [],
    providers: []
  }

  it('renders', () => {
     cy.mount(DashboardComponent, config);
  })
})
