import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../heroes/hero.model';

@Pipe({
  name: 'heroName'
})
export class HeroNamePipe implements PipeTransform {

  transform(heroes: Hero[], id: number): any {
    return heroes.find(hero => hero.id === id).localized_name.toUpperCase();
  }

}
