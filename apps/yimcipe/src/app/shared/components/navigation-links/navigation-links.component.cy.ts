import { MountConfig } from 'cypress/angular';
import { NavigationLinksComponent } from './navigation-links.component';

describe(NavigationLinksComponent.name, () => {
  const config: MountConfig<NavigationLinksComponent> = {
    declarations: [],
    imports: [],
    providers: []
  }

  it('renders', () => {
     cy.mount(NavigationLinksComponent, {
           ...config,
           componentProperties: {
               dropdownLocationState:  '',
               menuItemsClassList:  '',
               parentContainerClassList:  '',
          }
       });
  })
})
