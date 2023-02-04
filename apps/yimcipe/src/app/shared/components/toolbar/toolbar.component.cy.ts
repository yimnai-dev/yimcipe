import { MountConfig } from 'cypress/angular';
import { ToolbarComponent } from './toolbar.component';

describe(ToolbarComponent.name, () => {
  const config: MountConfig<ToolbarComponent> = {
    declarations: [],
    imports: [],
    providers: []
  }

  it('renders', () => {
     cy.mount(ToolbarComponent, {
           ...config,
           componentProperties: {
               nameInitial:  'Y',
          }
       });
  })
})
