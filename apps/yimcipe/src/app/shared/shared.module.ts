import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [ToolbarComponent, FooterComponent],
  imports: [CommonModule],
  exports: [ToolbarComponent, FooterComponent],
})
export class SharedModule {}
