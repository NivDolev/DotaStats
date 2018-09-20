import { Match } from './models/match';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  onLeagueName = false;
  inputLeagueName = '';

  leagues: any[] = [];
  filteredLeagues: any[] = [];

  selectedLeague: any;
  matches: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getInitialLeaguesData();
  }

  getInitialLeaguesData() {
    this.dataService.getData('leagues').subscribe(leagues => {
      const tempLeagues = leagues.sort(this.dynamicSort('leagueid')).reverse();
      tempLeagues.forEach(league => {
        if (league.leagueid < 65000 && league.tier === 'premium') {
          this.leagues.push(league);
        }
      });
      this.filteredLeagues = leagues;
    });
  }

  onFocusOutLeagueName() {
    this.getLeagueIdByName();
    this.getMatchesForSelectedLeague();
  }

  getLeagueIdByName() {
    this.selectedLeague = this.leagues.find(league => league.name === this.inputLeagueName);
    console.log(this.selectedLeague);
  }

  getMatchesForSelectedLeague() {
    const sqlQuery = encodeURI(`explorer?sql=select * from matches where leagueid=${this.selectedLeague.leagueid}`);
    this.dataService.getData(sqlQuery).subscribe(matches => {
      this.matches = matches;
      console.log(matches.rows);
    });
  }

  getLeagueGames() {
    this.dataService.getData('')
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
