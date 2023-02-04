import { MountConfig } from 'cypress/angular';
import { CommentsSectionComponent } from './comments-section.component';

describe(CommentsSectionComponent.name, () => {
  const config: MountConfig<CommentsSectionComponent> = {
    declarations: [],
    imports: [],
    providers: []
  }

  it('renders', () => {
     cy.mount(CommentsSectionComponent, config);
  })
})
