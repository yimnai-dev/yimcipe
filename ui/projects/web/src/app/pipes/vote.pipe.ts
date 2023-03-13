import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'vote',
  standalone: true,
  pure: false
})
export class VotePipe implements PipeTransform {
  transform(votes: any[] = [], type: string, recipeId: string) {
  if(type === 'upvote'){
    const result = votes.filter((vote: any) => vote.upvote === 1 && vote.recipeId === recipeId)
    return result.length
  }
  if(type === 'downvote'){
    const result = votes.filter((vote: any) => vote.downvote === 1 && vote.recipeId === recipeId)
    return result.length
  }
  return 0
  }
}
