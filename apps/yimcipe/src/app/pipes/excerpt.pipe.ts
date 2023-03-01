import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'excerpt',
  standalone: true,
  pure: false
})
export class ExcerptPipe implements PipeTransform {
  transform(recipeContent: string) {
    const regex = /<img\b[^>]*>/gi;
    const newContent = recipeContent.replace(regex, '');
    const excerpt = newContent.substring(0, 200);
    return excerpt + '...'
  }
}
