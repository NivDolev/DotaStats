import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  exampleMatch;
  matchHeroes = [];
  matchPickes = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData('matches/4080856812').subscribe(
      match => {
        this.exampleMatch = match;
        console.log(this.exampleMatch);
        this.matchHeroes = this.exampleMatch.picks_bans;
        console.log(this.matchHeroes);
        this.matchHeroes.forEach(hero => {
          if (hero.is_pick) { this.matchPickes.push(hero); }
        });
        console.log(this.matchPickes.sort(this.dynamicSort('team')));
      }
    );
  }

  dynamicSort(property) {
    let sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    };
  }
}
