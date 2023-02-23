import { RouterModule } from '@angular/router';
import { DropdownDirective } from './directives/dropdown.directive';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationLinksComponent } from './components/navigation-links/navigation-links.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ToastrModule } from 'ngx-toastr';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    FooterComponent,
    NavigationLinksComponent,
    DropdownDirective,
    LoadingSpinnerComponent,
  ],
  imports: [CommonModule, RouterModule, ToastrModule.forRoot()],
  exports: [
    ToolbarComponent,
    FooterComponent,
    NavigationLinksComponent,
    DropdownDirective,
    LoadingSpinnerComponent,
  ],
})
export class SharedModule {}
