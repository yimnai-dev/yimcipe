import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DropdownDirective } from './directives/dropdown.directive';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigationLinksComponent } from './components/navigation-links/navigation-links.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ToastrModule } from 'ngx-toastr';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    NavigationLinksComponent,
    DropdownDirective,
    LoadingSpinnerComponent,
    FooterComponent
  ],
  imports: [CommonModule, ToastrModule.forRoot(), FormsModule, RouterModule],
  exports: [
    ToolbarComponent,
    FooterComponent,
    NavigationLinksComponent,
    DropdownDirective,
    LoadingSpinnerComponent,
  ],
})
export class SharedModule {}
