import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationLinksComponent } from './components/navigation-links/navigation-links.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [ToolbarComponent, FooterComponent, NavigationLinksComponent],
  imports: [CommonModule],
  exports: [ToolbarComponent, FooterComponent, NavigationLinksComponent],
})
export class SharedModule {}
