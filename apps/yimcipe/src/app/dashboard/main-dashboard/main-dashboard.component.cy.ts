import { MountConfig } from 'cypress/angular';
import { MainDashboardComponent } from './main-dashboard.component';

describe(MainDashboardComponent.name, () => {
  const config: MountConfig<MainDashboardComponent> = {
    declarations: [],
    imports: [],
    providers: []
  }

  it('renders', () => {
     cy.mount(MainDashboardComponent, config);
  })
})
