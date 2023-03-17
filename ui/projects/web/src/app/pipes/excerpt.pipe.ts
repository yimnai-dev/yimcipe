import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'excerpt',
  standalone: true,
  pure: false
})
export class ExcerptPipe implements PipeTransform {
  constructor() {
   }

  transform(recipeContent: string) {
    const regex = /<img\b[^>]*>/gi;
    const newContent = recipeContent.replace(regex, '');
    const excerpt = newContent.substring(0, 300);
    return excerpt + '...'
  }
}
