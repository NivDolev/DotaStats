import { HeroPicks } from './models/heroPicks';
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
  leagueMatches: any[] = [];

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
    console.clear();
    if (this.inputLeagueName !== '') {
      this.getLeagueIdByName();
      this.getMatchesForSelectedLeague();
    } else {
      console.log('choose league');
    }
  }

  getLeagueIdByName() {
    this.selectedLeague = this.leagues.find(league => league.name === this.inputLeagueName);
    // console.log(this.selectedLeague);
  }

  getMatchesForSelectedLeague() {
    const sqlQuery = encodeURI(`explorer?sql=select * from matches where leagueid=${this.selectedLeague.leagueid}`);
    this.dataService.getData(sqlQuery).subscribe(matches => {
      this.selectedLeague = matches;
      console.log(matches);
      this.getHeroPickes();
    });
  }

  getHeroPickes() {
    const matchPicks: any[] = [];
    this.selectedLeague.rows.forEach(match => {
      const radiant: MatchDetails = {
        picks: [],
        winner: false
      };
      const dire: MatchDetails = {
        picks: [],
        winner: false
      };
      radiant.picks = match.picks_bans.filter(pick => pick.is_pick === true && pick.team === 1).sort(this.dynamicSort('hero_id'));
      radiant.winner = match.radiant_win ? true : false;
      dire.picks = match.picks_bans.filter(pick => pick.is_pick === true && pick.team === 1).sort(this.dynamicSort('hero_id'));
      dire.winner = match.radiant_win ? true : false;
      matchPicks.push(radiant);
      matchPicks.push(dire);
    });
    console.log(matchPicks);
  }

  getHeroCombinations(picks: any[]) {
    const combinations: {} = {
      wins: {},
      losses: {}
    };
    picks.forEach(pick => {

    });
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

class MatchDetails {
  picks: any[];
  winner: boolean;
}
